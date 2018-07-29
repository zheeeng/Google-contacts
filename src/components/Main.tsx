import React from 'react'
import classNames from 'classnames'
import { withStyles, WithStyles, createStyles, Theme } from '@material-ui/core/styles'
import Hidden from '@material-ui/core/Hidden'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import AccountCircle from '@material-ui/icons/AccountCircle'

import AppSideBar, { drawerWidth } from './AppSideBar'
import AppSearch from './AppSearch'

const styles = (theme: Theme) => createStyles({
  root: {
    width: '100vw',
    height: '100vh',
    flexGrow: 1,
    zIndex: 1,
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
  },
  toolbar: theme.mixins.toolbar,
  appBar: {
    zIndex: 1201,
  },
  appSearch: {
    flexGrow: 1,
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    paddingTop: theme.spacing.unit * 3,
    paddingRight: theme.spacing.unit * 6,
    paddingBottom: theme.spacing.unit * 3,
    paddingLeft: theme.spacing.unit,
    marginLeft: drawerWidth,
    display: 'flex',
    flexDirection: 'row',
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  contentShiftLeft: {
    marginLeft: 0,
  },
  drawerExpander: {
    marginRight: theme.spacing.unit * 2,
  },
})

interface Props extends WithStyles<typeof styles> {}
interface State {
  drawerOpen: boolean,
  accountMenuAnchorEl?: HTMLElement,
}

export class Main extends React.PureComponent<Props, State> {
  state = {
    drawerOpen: true,
    accountMenuAnchorEl: undefined,
  }

  handleDrawerToggle = () => {
    this.setState(state => ({ ...state, drawerOpen: !state.drawerOpen }))
  }
  handleAccountMenuClick = (event: any) => {
    event.persist()

    this.setState(state => ({ ...state, accountMenuAnchorEl: event.target }))
  }
  handleAccountMenuClose = () => {
    this.setState(state => ({ ...state, accountMenuAnchorEl: undefined }))
  }

  private renderAppBar () {
    const { classes } = this.props

    return (
      <Toolbar>
        <IconButton
          color="inherit"
          onClick={this.handleDrawerToggle}
          className={classes.drawerExpander}
        >
          <MenuIcon />
        </IconButton>
        <Hidden smDown implementation="css">
          <Typography variant="headline" color="inherit" noWrap>
            Google Contacts
          </Typography>
        </Hidden>
        <AppSearch className={classes.appSearch}/>
        <div>
          <IconButton
            onClick={this.handleAccountMenuClick}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <Menu
            anchorEl={this.state.accountMenuAnchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={!!this.state.accountMenuAnchorEl}
            onClose={this.handleAccountMenuClose}
          >
            <MenuItem onClick={this.handleAccountMenuClose}>
              Language
            </MenuItem>
            <MenuItem onClick={this.handleAccountMenuClose}>
              Sign Out
            </MenuItem>
          </Menu>
        </div>
      </Toolbar>
    )
  }

  render () {
    const { classes } = this.props

    return (
      <div className={classes.root}>
        <AppBar className={classes.appBar} position="static">
          {this.renderAppBar()}
        </AppBar>
        <AppSideBar
          open={this.state.drawerOpen}
          onClose={this.handleDrawerToggle}
        />
        <main className={classNames(classes.content, !this.state.drawerOpen && classes.contentShiftLeft)}>
          <div className={classes.toolbar} />
          <Typography noWrap>{'You think water moves fast? You should see ice.'}</Typography>
        </main>
      </div>
    )
  }
}

export default withStyles(styles)(Main)
