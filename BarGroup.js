class BarGroup{
    constructor(name, numBars){
        this.name = name;
        this.workTime = 0;
        this.otherTime = 0;
        this.workBar = createDiv();
        this.otherBar = createDiv();

        this.workBar.parent(document.getElementById('timedivision'));
        this.otherBar.parent(document.getElementById('timedivision'));

        let spacing = 14 + (70 * numBars);;
        this.workBar.style('margin-left', spacing + 'px');
        this.otherBar.style('margin-left', (spacing + 30) + 'px');
    }

    updateWorkBar(inc, time){
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

    updateOtherBar(inc, time){
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