import React from 'react'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Logo from '../../assets/img/logo.png'
import { useDispatch, useSelector } from 'react-redux'
import { getIsLogIn } from '../../reducks/users/selectors'
import { push } from 'connected-react-router'
import HeaderMenus from './Header.Menus'

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuBar: {
      backgroundColor: '#fff',
      color: '#444',
    },
    toolBar: {
      margin: '0 auto',
      maxWidth: 1024,
      width: '100%',
    },
    iconButtons: {
      margin: '0 0 0 auto',
    },
  })
)

const Header = () => {
  const classes = useStyles()
  const selector = useSelector((state) => state)
  const isLogIn = getIsLogIn(selector)
  const dispatch = useDispatch()

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.menuBar}>
        <Toolbar className={classes.toolBar}>
          <img src={Logo} alt="とらはっくロゴ" width="128px" onClick={() => dispatch(push('/'))} />
          {isLogIn && (
            <div className={classes.iconButtons}>
              <HeaderMenus />
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default Header
