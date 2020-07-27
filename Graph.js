//Class for display the graphs
class Graph{
    constructor(graph){
        //Fields
        //Both x and y axis are divs
        this.xAxis = createDiv();
        this.yAxis = createDiv();
        //The length of the x-axis
        this.xAxisLength = 500;

        //For the Time in App graph
        if(graph == 1){
            this.yAxis.parent(document.getElementById('timeinapp'));
            this.xAxis.parent(document.getElementById('timeinapp'));
        }
        //For the How You Spend Your Time graph
        else if(graph == 2){
            this.yAxis.parent(document.getElementById('timedivision'));
            this.xAxis.parent(document.getElementById('timedivision'));

            //CSS for the key
            let work = createDiv();
            work.parent(document.getElementById('timedivision'));
            work.style('position', 'absolute');
            work.style('height', '15px');
            work.style('width', '15px');
            work.style('border-style', 'solid');
            work.style('border-color', '#707070');
            work.style('border-radius', '2px');
            work.style('background-color', '#66ff66');
            work.style('margin-top', '365px');
            work.style('margin-left', '70px');

            let workLabel = createP('Work');
            workLabel.parent(work);

            workLabel.style('text-align', 'right');
            workLabel.style('position', 'absolute');
            workLabel.style('font-family', 'Arial, Helvetica, sans-serif');
            workLabel.style('color', '#707070');
            workLabel.style('margin-left', '20px');
            workLabel.style('margin-top', '-3px');
            workLabel.style('font-size', '20px');

            let other = createDiv();
            other.parent(document.getElementById('timedivision'));
            other.style('position', 'absolute');
            other.style('height', '15px');
            other.style('width', '15px');
            other.style('border-style', 'solid');
            other.style('border-color', '#707070');
            other.style('border-radius', '2px');
            other.style('background-color', '#9966ff');
            other.style('margin-top', '365px');
            other.style('margin-left', '150px');

            let otherLabel = createP('Other');
            otherLabel.parent(other);

            otherLabel.style('text-align', 'right');
            otherLabel.style('position', 'absolute');
            otherLabel.style('font-family', 'Arial, Helvetica, sans-serif');
            otherLabel.style('color', '#707070');
            otherLabel.style('margin-left', '20px');
            otherLabel.style('margin-top', '-3px');
            otherLabel.style('font-size', '20px');
        }

        //CSS for the x and y axis
        this.yAxis.style('margin-top', '40px');
        this.yAxis.style('margin-left', '70px');
        this.yAxis.style('height', '280px');
        this.yAxis.style('width', '4px');
        this.yAxis.style('background-color', '#707070');
        this.yAxis.style('border-radius', '2px');
        this.yAxis.style('position', 'absolute');

        let yAxisLabel = createP('Hours')
        yAxisLabel.parent(this.yAxis);

        yAxisLabel.style('font-family', 'Arial, Helvetica, sans-serif');
        yAxisLabel.style('font-size', '25px');
        yAxisLabel.style('color', '#707070');
        yAxisLabel.style('position', 'absolute');
        yAxisLabel.style('margin-top', '120px');
        yAxisLabel.style('margin-left', '-90px');
        /* Text rotation credit: https://webdesign.tutsplus.com/tutorials/easily-create-sideways-text-using-the-writing-mode-css-property--cms-31829 */
        yAxisLabel.style('transform', 'rotate(-90deg)');

        this.xAxis.style('margin-top', '318px');
        this.xAxis.style('margin-left', '70px');
        this.xAxis.style('height', '4px');
        this.xAxis.style('width', this.xAxisLength + 'px');
        this.xAxis.style('background-color', '#707070');
        this.xAxis.style('border-radius', '2px');
        this.xAxis.style('position', 'absolute');

        let xAxisLabel = createP('Hover over a bar for more information');
        xAxisLabel.parent(this.xAxis);

        xAxisLabel.style('font-family', 'Arial, Helvetica, sans-serif');
        xAxisLabel.style('font-size', '25px');
        xAxisLabel.style('color', '#707070');
        xAxisLabel.style('position', 'absolute');
        xAxisLabel.style('margin-top', '10px');
    }

    //Controls the numbers on the y-axis and the increments (inc) in which they increase
    yAxisNumbers(inc, graph){
        //Creates the numbers on the y-axis
        let one = createP();
        let two = createP();
        let three = createP();
        let four = createP();

        //Time in app graph
        if(graph == 1){
            one.id('numberone');
            two.id('numbertwo');
            three.id('numberthree');
            four.id('numberfour');

            document.getElementById('numberone').innerHTML = inc;
            document.getElementById('numbertwo').innerHTML = inc * 2;
            document.getElementById('numberthree').innerHTML = inc * 3;
            document.getElementById('numberfour').innerHTML = inc * 4;

            one.parent(document.getElementById('timeinapp'));
            two.parent(document.getElementById('timeinapp'));
            three.parent(document.getElementById('timeinapp'));
            four.parent(document.getElementById('timeinapp'));
        }
        //How you spend your time graph
        else if(graph == 2){
            one.id('number1');
            two.id('number2');
            three.id('number3');
            four.id('number4');
            
            document.getElementById('number1').innerHTML = inc;
            document.getElementById('number2').innerHTML = inc * 2;
            document.getElementById('number3').innerHTML = inc * 3;
            document.getElementById('number4').innerHTML = inc * 4;

            one.parent(document.getElementById('timedivision'));
            two.parent(document.getElementById('timedivision'));
            three.parent(document.getElementById('timedivision'));
            four.parent(document.getElementById('timedivision'));
        }

        //CSS for the numbers
        one.style('font-family', 'Arial, Helvetica, sans-serif');
        one.style('font-size', '25px');
        one.style('color', '#707070');
        one.style('position', 'absolute');
        let loc = 302 - 60;
        one.style('margin-top', loc + 'px');
        one.style('margin-left', '43px'); 

        two.style('font-family', 'Arial, Helvetica, sans-serif');
        two.style('font-size', '25px');
        two.style('color', '#707070');
        two.style('position', 'absolute');
        loc -= 60;
        two.style('margin-top', loc + 'px');
        two.style('margin-left', '43px');   

        three.style('font-family', 'Arial, Helvetica, sans-serif');
        three.style('font-size', '25px');
        three.style('color', '#707070');
        three.style('position', 'absolute');
        loc -= 60; 
        three.style('margin-top', loc + 'px');
        three.style('margin-left', '43px');

        four.style('font-family', 'Arial, Helvetica, sans-serif');
        four.style('font-size', '25px');
        four.style('color', '#707070');
        four.style('position', 'absolute');
        loc -= 60; 
        four.style('margin-top', loc + 'px');
        four.style('margin-left', '43px'); 
    }

    //Makes the x-axis longer
    updateXAxisLength(){
        this.xAxisLength = this.xAxisLength * 2;
        this.xAxis.style('width', this.xAxisLength + 'px');
    }
}