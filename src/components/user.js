import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { noteListeners, pushNote, deleteNote, resetAlerts }  from '../actions/actions_firebase_db';
import InputField  from './common/form/input';
import Alert  from './common/form/alert';

class User extends Component {
  static contextTypes = {
    router: PropTypes.object
  };
  componentWillMount(){
    this.props.noteListeners(this.props.params.userid);
    this.props.resetAlerts();
  }
  componentWillReceiveProps(nextProps){
    const { loggedIn } = nextProps.auth;
    if(!loggedIn){
      this.context.router.push(`/`);
    }
  }
  addNote(props){
    this.props.pushNote(this.props.params.userid, props);
  }
  undoDelete(event, note){
    event.preventDefault();
    this.props.pushNote(this.props.params.userid, note);
  }
  deleteNote(event, note){
    event.preventDefault();
    this.props.deleteNote(this.props.params.userid, note);
  }
  getNotes(notes){
    if(notes.length == 0){
      return <li className="list-group-item disabled">Add a note above</li>
    }
    return notes.map((noteItem, index) => {
      return (
        <li className="list-group-item" key={index}>
          {noteItem.note}
          <a href="" className="pull-xs-right" onClick={(event, note) => this.deleteNote(event, noteItem.key)}>Delete</a>
        </li>
      );
    });
  }
  render() {
    const { auth: { auth, loggedIn }, notes: { notes, alert, deleted_note }, fields: { note }, handleSubmit } = this.props;
    if(!loggedIn){
      return <span></span>
    }
    return (
      <div>
        <h2>{auth.displayName} Note List</h2>
        {alert.success ? <Alert type="success" message={alert.success} /> : '' }
        {alert.error ? <Alert type="error" message={alert.error} /> : '' }
        {alert.error == 'Your note was deleted' ? <a href="" onClick={(event, note) => this.undoDelete(event, this.props.notes.deleted_note)}>Undo delete</a> : '' }
        <form className="form-inline" onSubmit={handleSubmit(this.addNote.bind(this))}>
          <InputField type="text" placeholder="Enter Note" field={note} />
          <button className="btn btn-primary">Add Note</button>
        </form>
        {note.touched && note.error ? <Alert type="warning" message={note.error} /> : ''}
        <ul className="list-group">
          {this.getNotes(notes)}
        </ul>
      </div>
    );
  }
}

function mapStateToProps({ auth, notes }){
  return {
    auth,
    notes
  };
}

function validate(values) {
  const errors = {};
  if (!values.note) {
    errors.note = 'Please enter a note';
  }
  return errors;
}

export default reduxForm({
  form: 'NoteForm',
  fields: [ 'note' ],
  destroyOnUnmount: true,
  validate
}, mapStateToProps, { noteListeners, pushNote, deleteNote, resetAlerts })(User);
