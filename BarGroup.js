//Class for the bars in the "How You Spend Your Time" Graph
class BarGroup{
    //Constructor for the bars
    constructor(name, numBars){
        //Name of the program the bar represents
        this.name = name;
        //The time in minutes spent working in the program
        this.workTime = 0;
        //The time in minutes spent not working in the program
        this.otherTime = 0;
        //The bar to represent work time and time not working both represented by divs
        this.workBar = createDiv();
        this.otherBar = createDiv();

        //Positions the bars' divs in the div for the graph
        this.workBar.parent(document.getElementById('timedivision'));
        this.otherBar.parent(document.getElementById('timedivision'));

        let spacing = 14 + (70 * numBars);;
        this.workBar.style('margin-left', spacing + 'px');
        this.otherBar.style('margin-left', (spacing + 30) + 'px');
    }

    //Updates the height of the work bar
    updateWorkBar(inc, time){
        //Changes the height of the div based on the time spent in the app and the increment of time on the y-axis of the graph
        this.workBar.style('width', '30px');
        this.workTime += time;
        let height = this.workTime / inc;
        this.workBar.style('height', height + 'px');
        this.workBar.style('background-color', '#66ff66');
        let loc = 318 - height;
        this.workBar.style('margin-top', loc + 'px');
        this.workBar.style('cursor', 'pointer');
        this.workBar.style('position', 'absolute');

        this.workBar.attribute('title', 'spent ' + this.workTime + ' minutes working in ' + this.name);
    }
    //Updates the height of the bar for the time not spent working
    updateOtherBar(inc, time){
        //Changes the height of the div based on the time spent in the app and the increment of time on the y-axis of the graph
        this.otherBar.style('width', '30px');
        this.otherTime += time;
        let height = this.otherTime / inc;
        this.otherBar.style('height', height + 'px');
        this.otherBar.style('background-color', '#9966ff');
        let loc = 318 - height;
        this.otherBar.style('margin-top', loc + 'px');
        this.otherBar.style('cursor', 'pointer');
        this.otherBar.style('position', 'absolute');

        this.otherBar.attribute('title', 'spent ' + this.otherTime + ' minutes not working in ' + this.name);
    }

    //Getters
    
    getName(){
        return this.name;
    }

    getWorkTime(){
        return this.workTime;
    }

    getOtherTime(){
        return this.otherTime;
    }
}