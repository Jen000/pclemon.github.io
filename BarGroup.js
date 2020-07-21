class BarGroup{
    constructor(name, numBars){
        this.name = name;
        this.workTime = 0;
        this.scrollingTime = 0;
        this.leisureTime = 0;
        this.framecount = 0;
        this.workBar = createDiv();
        this.scrollingBar = createDiv();
        this.leisureBar = createDiv();

        this.workBar.parent(document.getElementById('timedivision'));
        this.leisureBar.parent(document.getElementById('timedivision'));
        this.scrollingBar.parent(document.getElementById('timedivision'));

        let spacing = -15 + (100 * numBars);
        this.workBar.style('margin-left', spacing + 'px');
        this.scrollingBar.style('margin-left', (spacing + 30) + 'px');
        this.leisureBar.style('margin-left', (spacing + 60) + 'px');
    }

    updateWorkBar(inc, time){
        this.workBar.style('width', '30px');
        this.workTime = time;
        let height = time / inc;
        this.workBar.style('height', height + 'px');
        this.workBar.style('background-color', '#66ff66');
        let loc = 318 - height;
        this.workBar.style('margin-top', loc + 'px');
        this.workBar.style('cursor', 'pointer');
        this.workBar.style('position', 'absolute');

        this.workBar.attribute('title', 'spent ' + time + ' minutes working in ' + this.name);
    }

    updateLeisureBar(inc, time){
        this.leisureBar.style('width', '30px');
        this.leisureTime = time;
        let height = time / inc;
        this.leisureBar.style('height', height + 'px');
        this.leisureBar.style('background-color', '#66ffff');
        let loc = 318 - height;
        this.leisureBar.style('margin-top', loc + 'px');
        this.leisureBar.style('cursor', 'pointer');
        this.leisureBar.style('position', 'absolute');

        this.leisureBar.attribute('title', 'spent ' + time + ' minutes leisure in ' + this.name);
    }

    updateScrollingBar(inc, time){
        this.scrollingBar.style('width', '30px');
        this.scrollingTime = time;
        let height = time / inc;
        this.scrollingBar.style('height', height + 'px');
        this.scrollingBar.style('background-color', '#9966ff');
        let loc = 318 - height;
        this.scrollingBar.style('margin-top', loc + 'px');
        this.scrollingBar.style('cursor', 'pointer');
        this.scrollingBar.style('position', 'absolute');

        this.scrollingBar.attribute('title', 'spent ' + time + ' minutes scrolling in ' + this.name);
    }

    getName(){
        return this.name;
    }

    getWorkTime(){
        return this.workTime;
    }

    getLeisureTime(){
        return this.leisureTime;
    }

    getScrollingTime(){
        return this.scrollingTime;
    }

    setFrameCount(count){
        this.frameCount = count;
    }

    getFrameCount(){
        return this.frameCount;
    }
}