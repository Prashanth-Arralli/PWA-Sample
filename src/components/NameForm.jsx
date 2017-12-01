import React from 'react';
import './NameForm.css';
import initializeSubscription, {unsubscribeUser} from '../scripts' ;
class NameForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {value: ''};
  
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.unRegisterUser = this.unRegisterUser.bind(this) ;
    }
  
    handleChange(event) {
      this.setState({value: event.target.value});
    }
  
    handleSubmit(event) {
      // fetch('https://localhost:3001/register', {
      //   method: 'POST',
      //   headers: {
      //     'Accept': 'application/json',
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     name: this.state.value
      //   })
      // }) ;
      initializeSubscription(this.state.value) ;
      this.formDiv.style.display = 'none' ;
      this.afterSubmit.style.display = 'block' ;
      event.preventDefault();
    }

    unRegisterUser(event){
      console.log("Unsubscription Triggered") ;
      unsubscribeUser() ;
      this.formDiv.style.display = 'block' ;
      this.afterSubmit.style.display = 'none' ;
    }
  
    render() {
      return (
        <div>
          <div className="beforeSubmit" ref={ref => this.formDiv = ref}>
            <div className="message1"> Enter your name and register for 'Take Break' notifications.</div>
            <form className="formClass" onSubmit={this.handleSubmit}>
              <label>
                Name
              </label>
              <input type="text" value={this.state.value} onChange={this.handleChange} />
              <br/>
              <input type="submit" value="Register" />
            </form>
          </div>
          <div className="afterSubmit" ref={ref => this.afterSubmit = ref}>
            <h2>{ this.state.value }</h2>
            <p> You have successfully registered for "Take Break" notifications</p>
            <p> Press below button to Unregister from notifications</p>
            <input type="submit" onClick={this.unRegisterUser} value="Unregister"/>
          </div>
        </div>
      );
    }
  }

  export default NameForm;