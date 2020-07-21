class Graph{
    constructor(graph){
        //Fields
        this.xAxis = createDiv();
        this.yAxis = createDiv();
        this.xAxisLength = 500;

        if(graph == 1){
            this.yAxis.parent(document.getElementById('timeinapp'));
            this.xAxis.parent(document.getElementById('timeinapp'));
        }
        else if(graph == 2){
            this.yAxis.parent(document.getElementById('timedivision'));
            this.xAxis.parent(document.getElementById('timedivision'));

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

            let scrolling = createDiv();
            scrolling.parent(document.getElementById('timedivision'));
            scrolling.style('position', 'absolute');
            scrolling.style('height', '15px');
            scrolling.style('width', '15px');
            scrolling.style('border-style', 'solid');
            scrolling.style('border-color', '#707070');
            scrolling.style('border-radius', '2px');
            scrolling.style('background-color', '#9966ff');
            scrolling.style('margin-top', '365px');
            scrolling.style('margin-left', '150px');

            let scrollingLabel = createP('Scrolling');
            scrollingLabel.parent(scrolling);

            scrollingLabel.style('text-align', 'right');
            scrollingLabel.style('position', 'absolute');
            scrollingLabel.style('font-family', 'Arial, Helvetica, sans-serif');
            scrollingLabel.style('color', '#707070');
            scrollingLabel.style('margin-left', '20px');
            scrollingLabel.style('margin-top', '-3px');
            scrollingLabel.style('font-size', '20px');

            let leisure = createDiv();
            leisure.parent(document.getElementById('timedivision'));
            leisure.style('position', 'absolute');
            leisure.style('height', '15px');
            leisure.style('width', '15px');
            leisure.style('border-style', 'solid');
            leisure.style('border-color', '#707070');
            leisure.style('border-radius', '2px');
            leisure.style('background-color', '#66ffff');
            leisure.style('margin-top', '365px');
            leisure.style('margin-left', '260px');

            let leisureLabel = createP('Leisure');
            leisureLabel.parent(leisure);

            leisureLabel.style('text-align', 'right');
            leisureLabel.style('position', 'absolute');
            leisureLabel.style('font-family', 'Arial, Helvetica, sans-serif');
            leisureLabel.style('color', '#707070');
            leisureLabel.style('margin-left', '20px');
            leisureLabel.style('margin-top', '-3px');
            leisureLabel.style('font-size', '20px');
        }

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
        //Text rotation credit: https://webdesign.tutsplus.com/tutorials/easily-create-sideways-text-using-the-writing-mode-css-property--cms-31829
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
        let one;
        let two;
        let three;
        let four;

        if(graph == 1){
            one = createP(inc);
            two = createP(inc * 2);
            three = createP(inc * 3);
            four = createP(inc * 4);

            one.parent(document.getElementById('timeinapp'));
            two.parent(document.getElementById('timeinapp'));
            three.parent(document.getElementById('timeinapp'));
            four.parent(document.getElementById('timeinapp'));
        }
        else if(graph == 2){
            one = createP(inc);
            two = createP(inc * 2);
            three = createP(inc * 3);
            four = createP(inc * 4);

            one.parent(document.getElementById('timedivision'));
            two.parent(document.getElementById('timedivision'));
            three.parent(document.getElementById('timedivision'));
            four.parent(document.getElementById('timedivision'));
        }

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

    updateXAxisLength(){
        this.xAxisLength = this.xAxisLength * 2;
        this.xAxis.style('width', this.xAxisLength + 'px');
    }
}