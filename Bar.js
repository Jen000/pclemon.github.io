//Class for the bars in the "Time in App" Graph
class Bar{
    //Constructor for the bar
    constructor(name, numBars){
        //Saves the frameCount for that particular bar to continue where it left off if a program is revisited by the user
        this.frameCount = 0;
        //Name of the program the bar represents
        this.name = name;
        //Time in minutes spent in the program
        this.time = 0;
        //The bar itself represented by div element
        this.bar = createDiv();

        //Positions the bar div in the div for the graph
        this.bar.style('position', 'absolute');
        this.bar.parent(document.getElementById('timeinapp'));
        
        let spacing = 45 + (40 * numBars);
        this.bar.style('margin-left', spacing + 'px');
   
    }

    //Updates the height of the bar
    updateBar(inc, time){
        //Changes the height of the div based on the time spent in the app and the increment of time on the y-axis of the graph
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
    
    //Getters
    
    getName(){
        return this.name;
    }

    getTime(){
        return this.time;
    }

    getFrameCount(){
        return this.frameCount;
    }

    //Setters

    setFrameCount(count){
        this.frameCount = count;
    }

    
}