import { LightningElement, api } from 'lwc';

export default class ScoreInformation extends LightningElement {

    @api score;
    @api attemptId;
    @api numberOfQuestions;

    

    get numberOfQuestionsCorrect(){
        return Math.floor((this.score / 100) * 68);
    }

    get numberOFQuestionsIncorrect(){
        return this.numberOfQuestions - this.numberOfQuestionsCorrect;

    }

    handleDeleteAttempt(){
        console.log('handleDeleteAttempt');
        const deleteEvent = new CustomEvent('deleteattempt', {
            detail: this.attemptId
        });
        this.dispatchEvent(deleteEvent);
    }

    connectedCallback(){
        console.log('This is a connected callback' + this.score);
    }


}