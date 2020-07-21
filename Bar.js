class Bar{
    constructor(name, numBars){
        this.frameCount = 0;
        this.name = name;
        this.time = 0;
        this.bar = createDiv();
        this.bar.style('position', 'absolute');
        this.bar.parent(document.getElementById('timeinapp'));
        let spacing = 45 + (40 * numBars);
        this.bar.style('margin-left', spacing + 'px');
   
    }

    updateBar(inc, time){
        this.bar.style('width', '30px');
        this.time = time;
        let height = time / inc;
        this.bar.style('height', height + 'px');
        this.bar.style('background-color', '#66ff66');
        let loc = 318 - height;
        this.bar.style('margin-top', loc + 'px');
        this.bar.style('cursor', 'pointer');

        this.bar.attribute('title', 'spent ' + time + ' minutes in ' + this.name);
    }
    
    getName(){
        return this.name;
    }

    getTime(){
        return this.time;
    }

    setFrameCount(count){
        this.frameCount = count;
    }

    getFrameCount(){
        return this.frameCount;
    }
}