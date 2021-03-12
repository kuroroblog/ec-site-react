import { useState, useCallback } from 'react'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Logo from '../../assets/img/logo.png'
import { useDispatch, useSelector } from 'react-redux'
import { getIsLogIn } from '../../reducks/users/selectors'
import { push } from 'connected-react-router'
import { HeaderMenus, ClosableDrawer } from './'

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

  const [open, setOpen] = useState(false)

  const handleDrawerToggle = useCallback(
    (event, open) => {
      if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
        return
      }
      setOpen(open)
    },
    [setOpen]
  )

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.menuBar}>
        <Toolbar className={classes.toolBar}>
          <img src={Logo} alt="とらはっくロゴ" width="128px" onClick={() => dispatch(push('/'))} />
          {isLogIn && (
            <div className={classes.iconButtons}>
              <HeaderMenus handleDrawerToggle={handleDrawerToggle} />
            </div>
          )}
        </Toolbar>
      </AppBar>
      <ClosableDrawer open={open} onClose={handleDrawerToggle} />
    </div>
  )
}

export default Header
