import React, {Component} from 'react'
import {reduxForm} from 'redux-form'
import SurveyForm from '../components/surveys/SurveyForms'
import SurveyFormReview from '../components/surveys/SurveyFormReview'

class SurveyNew extends Component{
    state={
        showFormReview: false
    }
    
    onToggleForm(){
       const formState = this.state.showFormReview
        this.setState({ showFormReview: !formState })
    }
    renderContent(){
       return this.state.showFormReview ? (
					<SurveyFormReview onCancel={()=>this.onToggleForm()} />
				) : (
					<SurveyForm onSurveySubmit={()=>this.onToggleForm()} />
				);
    }

    render(){
         
        return(
            <div>
                {this.renderContent()}
            </div>
        )
    }
}

export default reduxForm({
    form: 'surveyForm'
})(SurveyNew)