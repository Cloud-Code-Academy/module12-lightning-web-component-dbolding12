import { LightningElement, track } from 'lwc';
const devFundWeight = 0.23;
const processAutoWeight = 0.3;
const userInterfaceWeight = 0.25;
const testDebugWeight = 0.22;

export default class PlatformDevCertCalculator extends LightningElement {

    devFundamentals = 50;
    processAutomation = 50;
    userInterface = 50;
    testDebugDeploy = 50;

    certificationScore = 90;
    numberOfQuestionsCorrect = 60;

    showResources = false;

    currentHistoryId = 0;

    @track attemptHistory = [
        {Id: 1, Score:50},
        {Id: 2, Score:25}
    ];

    calculateScore(){
        let devFundWeightScore = this.devFundamentals * devFundWeight;
        let processAutoWeightScore = this.processAutomation * processAutoWeight;
        let userInterfaceWeightScore = this.userInterface * userInterfaceWeight;
        let testDebugWeightScore = this.testDebugDeploy * testDebugWeight;

        this.certificationScore = devFundWeightScore + processAutoWeightScore + userInterfaceWeightScore + testDebugWeightScore;
        console.log(this.certificationScore);

        this.showResourcesIfFailed();
        this.addAttemptHistory(this.certificationScore);
    }

    handleChange(event){
        console.log(event);
        console.log(event.target, event.target.name, event.target.value);

        const inputName = event.target.name;
        let value = Number(event.target.value);

        if(inputName === 'devFundamentals'){
            this.devFundamentals = value;
        }else if (inputName === 'processAutomation'){ 
            this.processAutomation = value;  

        }else if (inputName === 'userInterface'){
            this.userInterface = value;
        }else if (inputName === 'testDebugDeploy')  {
            this.testDebugDeploy = value;
        }   
               
    }

    showResourcesIfFailed(){
        if(this.certificationScore < 68){
            this.showResources = true;
        } else {
            this.showResources = false;
        }
    }

    addAttemptHistory(Score) {
        this.currentHistoryId ++;
        const attempt = {
            Id: this.currentHistoryId, Score
        }
       this.attemptHistory = [...this.attemptHistory, attempt];
        console.log(this.attemptHistory);
        }
        
    deleteAttemptHandler(event){
        console.log('this is called from the parent component', event.detail);
        let attemptId = event.detail;
        this.attemptHistory = this.attemptHistory.filter(attempt => attempt.Id != attemptId);
        console.log('new attempt history' + this,this.attemptHistory);
      
      
    }

    connectedCallback() {
        this.currentHistoryId = this.attemptHistory.length;

    }
  

}