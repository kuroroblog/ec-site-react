import { useState, useCallback } from 'react'
import Divider from '@material-ui/core/Divider'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import { makeStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import SearchIcon from '@material-ui/icons/Search'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import HistoryIcon from '@material-ui/icons/History'
import PersonIcon from '@material-ui/icons/Person'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import { TextInput } from '../UIKit/index'
import { push } from 'connected-react-router'
import { useDispatch } from 'react-redux'
import { logOut } from '../../reducks/users/operations'
import { genders } from '../../config/gender'
import { categories } from '../../config/category'

const useStyles = makeStyles((theme) => ({
  drawer: {
    [theme.breakpoints.up('sm')]: {
      flexShrink: 0,
      width: 256,
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: 256,
  },
  searchField: {
    alignItems: 'center',
    display: 'flex',
    marginLeft: 32,
  },
}))

const ClosableDrawer = (props: any) => {
  const classes = useStyles()
  const { container } = props

  const [keyword, setKeyword] = useState('')
  const inputKeyword = useCallback(
    (event) => {
      setKeyword(event.target.value)
    },
    [setKeyword]
  )

  const dispatch = useDispatch()
  const selectMenu = (event: any, path: string) => {
    dispatch(push(path))
    props.onClose(event, false)
  }

  const filters = [
    {
      func: selectMenu,
      label: genders[0].name,
      id: genders[0].id,
      value: genders[0].path,
    },
    {
      func: selectMenu,
      label: genders[1].name,
      id: genders[1].id,
      value: genders[1].path,
    },
    {
      func: selectMenu,
      label: genders[2].name,
      id: genders[2].id,
      value: genders[2].path,
    },
    {
      func: selectMenu,
      label: categories[0].name,
      id: categories[0].id,
      value: categories[0].path,
    },
    {
      func: selectMenu,
      label: categories[1].name,
      id: categories[1].id,
      value: categories[1].path,
    },
    {
      func: selectMenu,
      label: categories[2].name,
      id: categories[2].id,
      value: categories[2].path,
    },
  ]

  const menus = [
    {
      func: selectMenu,
      label: '商品登録',
      icon: <AddCircleIcon />,
      id: 'register',
      value: '/product/edit',
    },
    {
      func: selectMenu,
      label: '注文履歴',
      icon: <HistoryIcon />,
      id: 'history',
      value: '/order/history',
    },
    {
      func: selectMenu,
      label: 'プロフィール',
      icon: <PersonIcon />,
      id: 'profile',
      value: '/user/mypage',
    },
  ]

  return (
    <nav className={classes.drawer}>
      <Drawer
        container={container}
        variant="temporary"
        anchor="right"
        open={props.open}
        onClose={(event) => props.onClose(event, false)}
        className={classes.drawerPaper}
        ModalProps={{ keepMounted: true }}
      >
        <div>
          <div className={classes.searchField}>
            <TextInput
              fullWidth={false}
              label={'キーワードを入力'}
              multiline={false}
              onChange={inputKeyword}
              required={false}
              rows={1}
              value={keyword}
              type={'text'}
            />
            <IconButton>
              <SearchIcon />
            </IconButton>
          </div>
          <Divider />
          <List>
            {menus.map((menu) => (
              <ListItem button key={menu.id} onClick={(event) => menu.func(event, menu.value)}>
                <ListItemIcon>{menu.icon}</ListItemIcon>
                <ListItemText primary={menu.label} />
              </ListItem>
            ))}
            <ListItem
              button
              key="logout"
              onClick={(event) => {
                dispatch(logOut())
                props.onClose(event, false)
              }}
            >
              <ListItemIcon>
                <ExitToAppIcon />
              </ListItemIcon>
              <ListItemText primary={'Logout'} />
            </ListItem>
          </List>
          <Divider />
          <List>
            {filters.map((filter) => (
              <ListItem button key={filter.id} onClick={(event) => filter.func(event, filter.value)}>
                <ListItemText primary={filter.label} />
              </ListItem>
            ))}
          </List>
        </div>
      </Drawer>
    </nav>
  )
}

export default ClosableDrawer
