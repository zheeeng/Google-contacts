import React from 'react'
import { withStyles, WithStyles, createStyles, Theme } from '@material-ui/core/styles'
import ListItem from '@material-ui/core/ListItem'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import Hidden from '@material-ui/core/Hidden'
import Avatar from '@material-ui/core/Avatar'
import StarIcon from '@material-ui/icons/Star'
import EditIcon from '@material-ui/icons/Edit'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'

import { groupServlet, GroupServletProps, Contact } from '~src/context/GAPI'

const styles = (theme: Theme) => createStyles({
  listItem: {
    'width': '100%',
    // tslint:disable-next-line:max-line-length
    'margin': `${theme.spacing.unit}px -${theme.spacing.unit * 2}px ${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
    'backgroundColor': theme.palette.background.paper,
    '& &-buttons': {
      display: 'none',
    },
    '&:hover &-buttons': {
      display: 'block',
    },
  },
})

type Props = GroupServletProps & WithStyles<typeof styles> & {
  contact: Contact,
  onClick: (e: any) => void,
  onDelete: (e: any) => void,
}

class ContactItem extends React.PureComponent<Props> {
  render () {
    const contact = this.props.contact

    return (
      <ListItem
        dense
        button
        onClick={this.props.onClick}
        classes={{
          container: this.props.classes.listItem,
        }}
      >
        <Avatar alt={contact.name} src={contact.avatar || ''} />
        <ListItemText primary={contact.name} />
        <Hidden smDown>
          <ListItemText primary={contact.email} />
        </Hidden>
        <ListItemSecondaryAction className={this.props.classes.listItem + '-buttons'}>
          <IconButton>
            <StarIcon />
          </IconButton>
          <IconButton>
            <EditIcon />
          </IconButton>
          <IconButton onClick={this.props.onDelete}>
            <DeleteIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    )
  }
}

export default groupServlet(withStyles(styles)(ContactItem))
