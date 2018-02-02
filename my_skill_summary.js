		var outerWidth = 1300;
		var outerHeight = 1000;
		var margin = {left: 70, top: 5, right: 5, bottom: 60 };
		var dyStep = 12;
		var amm_d3_data="test_data.csv";
		
		// text labels used within dashboard
		var topHeader = "My Skill Summary and Plan";
		var prodCatHeader = "Skill Name";
		var baselineSubHeader1="Current";
		var baselineSubHeader2="(2017)";
		var currSubHeader1 = "Planned";
		var currSubHeader2 = "(2018)";
		var planSubHeader1 = "Future";
		var planSubHeader2 = "(2019)";
		var noneHeader = "None";
		var insuffSubHeader1 = "Beginner";
		var insuffSubHeader2 = "";
		var typicalSubHeader1 = "Intermediate";
		var typicalSubHeader2 = "";
		var advGoldSubHeader1 = "Advanced";
		var advGoldSubHeader2 = "";
		var diffSubHeader1 = "Expert";
		var diffSubHeader2 = "";
		
		var topHeaderWidth = 1290;
		var topHeaderHeight = 60;
		var topHeaderStroke = "white";
		
		var individualRowHeight=25;
		
		var secHeaderHeight = 80;
		var secHeaderStroke = "gray";
		var secHeaderBlankRectWidth = 100;
		var secHeaderGenericRectWidth = 80;

		// fill colors used for different headings
		var colorTopHeader = "rgb(32,55,100)";
		var colorBaseline = "orange";
		var colorCurrent = "white";
		var colorPlanned = "limegreen";
		var colorNone = "rgb(255,255,200)";
		var colorBronze = "rgb(252,228,214)";
		var colorSilver = "rgb(214,220,228)";
		var colorGold = "rgb(255,242,204)";
		var colorDiamond = "rgb(221,255,255)";
		var colorWhite="rgb(255,255,255)";
		var colorGreenCircle="orange";
		var colorBlueCircle="blue";
		var colorOrangeCircle="limegreen";
		//var colorHover="bisque";
		var colorHover="lightsteelblue";
		//var colorHover="skyblue";
		var colorGreen="orange";
		var colorBlue="blue";
		var colorOrange="limegreen";
		
		var strokeWidth=.3;
		
		baselinePath="idBaselinePath";
		currentPath = "idCurrentPath";
		plannedPath = "idPlannedPath";
		
		
		var svg = d3.select("body").append("svg")
			.attr("width", outerWidth)
			.attr("height", outerHeight);
			
		//var bPath = svg.append("path")
		//	.attr("id", baselinePath);
		//var cPath = svg.append("path")
		//	.attr("id", currentPath);
		//var pPath = svg.append("path")
		//	.attr("id", plannedPath);
		
		
		var gTopHeader = svg.append("g")
			.attr("transform", "translate(0, 0)");

		// top header rectangle
		var gTopRect = gTopHeader.append("rect")
			.attr("x", margin.left)
			.attr("y", margin.top)
			.attr("fill", colorTopHeader)
			.attr("width", 4*secHeaderBlankRectWidth + 7*secHeaderGenericRectWidth + secHeaderGenericRectWidth/2 + secHeaderGenericRectWidth/2)
			.attr("height", topHeaderHeight)
			.attr("stroke", topHeaderStroke);
			
		// top header text
		var gTopText = gTopHeader.append("text")
			.attr("class", "a")
			.attr("x", (4*secHeaderBlankRectWidth + 7*secHeaderGenericRectWidth + secHeaderGenericRectWidth/2)/2 - 100)
			.attr("y", topHeaderHeight - 10)
			.text(topHeader);
			
		// 2nd header row started here..
		var gSecHeader = svg.append("g");
		
		var baselineCoord = [];
		var currentCoord = [];
		var plannedCoord = [];
		
		var statusByProdCat = {}; // dictionary containing statuses (baseline, current & planned values) of each product under a product category
		
		var interploateScheme="cardinal";
		//var interploateScheme="monotone";
		//var interploateScheme="linear";
		
		var defCircleRad=4;
		var blownCircleRad=8;
		
		var defOpacity = 1;
		var lightOpacity = .7;
		var pathTransitionDuration=1200;
		
		var currDelay = 1000;
		var plannedDelay = 1500;
		
		
		function displayBaseline()
		{
			//alert ('Function to display baseline trend');
			d3.select(this)
				.attr("fill",colorHover);

			// reset the path for other two
			d3.select("#" + currentPath)
			    .transition()
				.attr("d", null);
			d3.select("#" + plannedPath)
				.transition()
				.attr("d", null);
				
			var lPath=d3.select("#"+baselinePath)
			.attr("stroke", colorGreen)
			//.attr("stroke-width", 2)
			.attr("fill", "none");
			//.attr("class", "path");
			
			//console.log(lPath);
			
			
			var lineFun = d3.svg.line()
							.x(function(d) {return d.x;})
							.y(function(d) {return d.y;})
							.interpolate(interploateScheme);
							//.tension(.5);
			lPath.transition()
				.attr("d", lineFun(baselineCoord))
				.duration(pathTransitionDuration)
				.attr("stroke-dashoffset", 0);
			
				 //.attr("class", path)
				 //.transition()
				 //.duration(1500)
				 //.attr("stroke-dashoffset", 0);
		}
		
		function displayBaselineMouseOut()
		{
			d3.select(this)
				.attr("fill",colorBaseline);
		}
		
		function displayCurrentMouseOut()
		{
			d3.select(this)
				.attr("fill",colorCurrent);
		}
		
		function displayPlannedMouseOut()
		{
			d3.select(this)
				.attr("fill",colorPlanned);
		}		
		
		function displayCurrent()
		{
			//alert('Function to display current trend');
			d3.select(this)
				.attr("fill",colorHover);
				
			// reset the path for other two
			d3.select("#" + currentPath)
				.transition()
				.attr("d", null);
			d3.select("#" + plannedPath)
				.transition()
				.attr("d", null);
				
			//var lPath=d3.select("#" + currentPath)
			var lPath = d3.select("#" + baselinePath)
			.attr("stroke", colorBlue)
			//.attr("stroke-width", 2)
			.attr("fill", "none");
			
			var lineFun = d3.svg.line()
							.x(function(d) {return d.x;})
							.y(function(d) {return d.y;})
							.interpolate(interploateScheme);
			lPath.transition()
				.attr("d", lineFun(currentCoord))
				.duration(pathTransitionDuration);
			//lPath.transition()
			//	.attr("d", null);
		}
		
		function displayPlanned()
		{
			//alert('Function to display planned trend');
			d3.select(this)
				.attr("fill",colorHover);
				
			// reset the path for other two
			d3.select("#" + currentPath)
				.transition()
				.attr("d", null);
			d3.select("#" + plannedPath)
				.transition()
				.attr("d", null);
				
				
			//var lPath=d3.select("#"+plannedPath)
			var lPath = d3.select("#" + baselinePath)
			.attr("stroke", colorOrange)
			//.attr("stroke-width", 2)
			.attr("fill", "none");
			
			var lineFun = d3.svg.line()
							.x(function(d) {return d.x;})
							.y(function(d) {return d.y;})
							.interpolate(interploateScheme);
			lPath.transition()
				.attr("d", lineFun(plannedCoord))
				.duration(pathTransitionDuration);			
		}
		
		function displayAll()
		{
			d3.select(this)
				.attr("fill", colorHover);
				
			// display all; baseline, current and planned
			var bPath = d3.select("#" + baselinePath)
				.attr("stroke", colorGreen)
				.attr("fill", "none");
				
			var lineB = d3.svg.line()
							.x(function(d) {return d.x})
							.y(function(d) {return d.y})
							.interpolate(interploateScheme);
			bPath.transition()
				.attr("d", lineB(baselineCoord))
				.duration(pathTransitionDuration);
				
			var cPath = d3.select("#" + currentPath)
				.attr("stroke", colorBlue)
				.attr("fill", "none");
				
			var lineC = d3.svg.line()
							.x(function(d) {return d.x})
							.y(function(d) {return d.y})
							.interpolate(interploateScheme);
			/*
			setTimeout(
				function () {cPath.transition()
					.attr("d", lineC(currentCoord))
					.duration(pathTransitionDuration); }
					, 100);
			*/
			cPath.transition()
				.attr("d", lineC(currentCoord))
				.duration(pathTransitionDuration + currDelay);
				
			var pPath = d3.select("#" + plannedPath)
				.attr("stroke", colorOrange)
				.attr("fill", "none");
			
			var lineP = d3.svg.line()
							.x(function(d) {return d.x})
							.y(function(d) {return d.y})
							.interpolate(interploateScheme);
							
			/*
			setTimeout(
				function () {pPath.transition()
					.attr("d", lineP(plannedCoord))
					.duration(pathTransitionDuration);}
					, 200);
			*/
			pPath.transition()
				.attr("d", lineP(plannedCoord))
				.duration(pathTransitionDuration + plannedDelay);
						
		}
		
		function displayAllResetColor()
		{
			d3.select(this)
				.attr("fill", colorTopHeader);
		}
		
		function handleMouseOverBaseline(d, i) {
			d3.select(this)
				.attr("fill",colorHover);
			cir_id = this.id.replace("rect_","cir_");
			
			d3.select("#"+cir_id)
				.attr("r",blownCircleRad);
				
			
			//prod_rect = this.id.replace("_b_", "_prod_");
			//d3.select("#"+prod_rect)
				//.attr("fill", colorHover);
		}
		
		function handleMouseOutBaseline(d, i){
			d3.select(this)
				.attr("fill",colorBaseline);
				
			cir_id = this.id.replace("rect_","cir_");
			d3.select("#"+cir_id)
				.attr("r",defCircleRad);	

			prod_rect = this.id.replace("_b_", "_prod_");
			d3.select("#"+prod_rect)
			
				.attr("fill", colorWhite);				
		}
		
		function handleMouseOverCurrent(d, i) {
			d3.select(this)
				.attr("fill",colorHover);
			cir_id = this.id.replace("rect_","cir_");
			
			d3.select("#"+cir_id)
				.attr("r",blownCircleRad);
		}
		
		function handleMouseOutCurrent(d, i){
			d3.select(this)
				.attr("fill",colorCurrent);
				
			cir_id = this.id.replace("rect_","cir_");
			d3.select("#"+cir_id)
				.attr("r",defCircleRad);				
		}		
		
		function handleMouseOverPlanned(d, i) {
			d3.select(this)
				.attr("fill",colorHover);
			cir_id = this.id.replace("rect_","cir_");
			
			d3.select("#"+cir_id)
				.attr("r",blownCircleRad);
		}
		
		function handleMouseOutPlanned(d, i){
			d3.select(this)
				.attr("fill",colorPlanned);
				
			cir_id = this.id.replace("rect_","cir_");
			d3.select("#"+cir_id)
				.attr("r",defCircleRad);				
		}		
		
		function handleMouseOverProdCat (d,i) {
			d3.select(this)
				.attr("fill", colorHover);
			var pcNum = this.id.slice("pc_".length);
			//console.log(pcNum);
			//console.log(statusByProdCat[pcNum]);
			
			statusByProdCat[pcNum].forEach(function(prodList) {
				//	console.log(prodList["voff"]);
				//	console.log(prodList["baseline"]);
				//	console.log(prodList["current"]);
				//	console.log(prodList["planned"]);
				
				// find product
				idProd = "#rect_" + prodList["voff"] + "_prod_" + prodList["baseline"] + "_" + prodList["current"] + "_" + prodList["planned"];
				d3.select(idProd)
					.attr("fill", colorHover);
					
				idBaseline = "#rect_" + prodList["voff"] + "_b_"+ prodList["baseline"];
				idCurrent = "#rect_" + prodList["voff"] + "_c_"+ prodList["current"];
				idPlanned = "#rect_" + prodList["voff"] + "_p_"+ prodList["planned"];
				
				d3.select(idBaseline)
					.attr("fill", colorHover);
				d3.select(idCurrent)
					.attr("fill", colorHover);
				d3.select(idPlanned)
					.attr("fill", colorHover);
			});
			startIdx = statusByProdCat[pcNum][0]["voff"];
			endIdx = statusByProdCat[pcNum][0]["voff"] + statusByProdCat[pcNum].length;
			
			bPathSlice = baselineCoord.slice(startIdx, endIdx);
			cPathSlice = currentCoord.slice(startIdx, endIdx);
			pPathSlice = plannedCoord.slice(startIdx, endIdx);
			
			var bPath = d3.select("#" + baselinePath)
				.attr("stroke", colorGreen)
				.attr("fill", "none");
				
			var lineB = d3.svg.line()
							.x(function(d) {return d.x})
							.y(function(d) {return d.y})
							.interpolate(interploateScheme);
			bPath.transition()
				.attr("d", lineB(bPathSlice))
				.duration(pathTransitionDuration);		

			var cPath = d3.select("#" + currentPath)
				.attr("stroke", colorBlue)
				.attr("fill", "none");
				
			var lineC = d3.svg.line()
							.x(function(d) {return d.x})
							.y(function(d) {return d.y})
							.interpolate(interploateScheme);
			/*
			setTimeout( function() {cPath.transition()
							.attr("d", lineC(cPathSlice))
							.duration(pathTransitionDuration);}
							, 100);
			*/
			cPath.transition()
				.attr("d", lineC(cPathSlice))
				.duration(pathTransitionDuration);
					

			var pPath = d3.select("#" + plannedPath)
				.attr("stroke", colorOrange)
				.attr("fill", "none");
				
			var lineP = d3.svg.line()
							.x(function(d) {return d.x})
							.y(function(d) {return d.y})
							.interpolate(interploateScheme);
			
			/*
			setTimeout( function() { pPath.transition()
							.attr("d", lineC(pPathSlice))
							.duration(pathTransitionDuration);}
							, 200);
			*/
			pPath.transition()
				.attr("d", lineC(pPathSlice))
				.duration(pathTransitionDuration);
				
			
		}
		
		function handleMouseOutProdCat (d,i) {
			d3.select(this)
				.attr("fill", colorWhite);
			var pcNum = this.id.slice("pc_".length);
			
			statusByProdCat[pcNum].forEach(function(prodList) {
				// find product
				idProd = "#rect_" + prodList["voff"] + "_prod_" + prodList["baseline"] + "_" + prodList["current"] + "_" + prodList["planned"];
				d3.select(idProd)
					.attr("fill", colorWhite);
					
				idBaseline = "#rect_" + prodList["voff"] + "_b_"+ prodList["baseline"];
				idCurrent = "#rect_" + prodList["voff"] + "_c_"+ prodList["current"];
				idPlanned = "#rect_" + prodList["voff"] + "_p_"+ prodList["planned"];
				
				d3.select(idBaseline)
					.attr("fill", colorBaseline);
				d3.select(idCurrent)
					.attr("fill", colorCurrent);
				d3.select(idPlanned)
					.attr("fill", colorPlanned);					
			});
			//d3.select("#" + baselinePath)
			//	.attr("d", null);
			//d3.select("#" + currentPath)
			//	.attr("d", null);
			//d3.select("#" + plannedPath)
			//	.attr("d", null);			
			
		}
		
		function handleMouseOverProd (d,i) {
			d3.select(this)
				.attr("fill", colorHover);
				
			prodValues=this.id.slice(this.id.indexOf("_prod_") + "_prod_".length).split("_");
			leftID = this.id.slice(0,this.id.indexOf("_prod_"));
			
			idBaseline=leftID + "_b_" + prodValues[0]; //baseline
			idCurrent=leftID + "_c_" + prodValues[1]; //current
			idPlanned=leftID + "_p_" + prodValues[2];
			
			d3.select("#" + idBaseline)
				.attr("fill", colorHover);
			d3.select("#" + idCurrent)
				.attr("fill", colorHover);
			d3.select("#" + idPlanned)
				.attr("fill", colorHover);
				
			cirBaseline = idBaseline.replace("rect_","cir_");
			cirCurrent = idCurrent.replace("rect_", "cir_");
			cirPlanned = idPlanned.replace("rect_", "cir_");
			
			d3.select("#"+cirBaseline)
				.attr("r",blownCircleRad)
				.style("opacity", lightOpacity);
			d3.select("#"+cirCurrent)
				.attr("r",blownCircleRad)
				.style("opacity", lightOpacity);
			d3.select("#"+cirPlanned)
				.attr("r",blownCircleRad)
				.style("opacity", lightOpacity);
		}
		
		function handleMouseOutProd (d,i) {
			d3.select(this)
				.attr("fill", colorWhite);

			prodValues=this.id.slice(this.id.indexOf("_prod_") + "_prod_".length).split("_");
			leftID = this.id.slice(0,this.id.indexOf("_prod_"));
			
			idBaseline=leftID + "_b_" + prodValues[0]; //baseline
			idCurrent=leftID + "_c_" + prodValues[1]; //current
			idPlanned=leftID + "_p_" + prodValues[2];
			
			d3.select("#" + idBaseline)
				.attr("fill", colorBaseline);
			d3.select("#" + idCurrent)
				.attr("fill", colorCurrent);
			d3.select("#" + idPlanned)
				.attr("fill", colorPlanned);

			cirBaseline = idBaseline.replace("rect_","cir_");
			cirCurrent = idCurrent.replace("rect_", "cir_");
			cirPlanned = idPlanned.replace("rect_", "cir_");
			
			d3.select("#"+cirBaseline)
				.attr("r",defCircleRad)
				.style("opacity", defOpacity);
			d3.select("#"+cirCurrent)
				.attr("r",defCircleRad)
				.style("opacity", defOpacity);
			d3.select("#"+cirPlanned)
				.attr("r",defCircleRad)
				.style("opacity", defOpacity);
				
		}
		
		function displayCircles(flag, stateValue, gProdCat, verticalOffset)
		{
			if (flag == "baseline")
			{
				var cx = margin.left + secHeaderBlankRectWidth + 3*secHeaderBlankRectWidth + secHeaderGenericRectWidth + secHeaderGenericRectWidth
									+ secHeaderGenericRectWidth + stateValue*(secHeaderGenericRectWidth/2) + secHeaderGenericRectWidth/2/2;
				var cy = margin.top + 2*topHeaderHeight + verticalOffset*individualRowHeight + individualRowHeight/2;
				gProdCat.append("circle")
				.attr("cx", cx)
				.attr("cy", cy)
				.attr("r", defCircleRad)
				.attr("id", "cir_" + verticalOffset + "_b_"+ stateValue)
				.attr("fill", colorGreenCircle);
				
				baselineCoord.push({"x":cx, "y":cy});
			}
			
			if (flag == "current")
			{
				var cx = margin.left + secHeaderBlankRectWidth + 3*secHeaderBlankRectWidth + secHeaderGenericRectWidth + secHeaderGenericRectWidth
									+ secHeaderGenericRectWidth + stateValue*(secHeaderGenericRectWidth/2) + secHeaderGenericRectWidth/2/2;
				var cy = margin.top + 2*topHeaderHeight + verticalOffset*individualRowHeight + individualRowHeight/2 + 5;
				gProdCat.append("circle")
				.attr("cx", cx)
				.attr("cy", cy)
				.attr("r", defCircleRad)
				.attr("id", "cir_" + verticalOffset + "_c_"+ stateValue)
				.attr("fill", colorBlueCircle);
				
				currentCoord.push({"x":cx, "y":cy});
			}
			
			if (flag == "planned")
			{
				var cx = margin.left + secHeaderBlankRectWidth + 3*secHeaderBlankRectWidth + secHeaderGenericRectWidth + secHeaderGenericRectWidth
									+ secHeaderGenericRectWidth + stateValue*(secHeaderGenericRectWidth/2) + secHeaderGenericRectWidth/2/2;
				var cy = margin.top + 2*topHeaderHeight + verticalOffset*individualRowHeight + individualRowHeight/2 - 5;
				gProdCat.append("circle")
				.attr("cx", cx)
				.attr("cy", cy)
				.attr("r", defCircleRad)
				.attr("id", "cir_" + verticalOffset + "_p_"+ stateValue)
				.attr("fill", colorOrangeCircle);
				
				plannedCoord.push({"x":cx, "y":cy});
			}

		}			
		
		gSecHeader.append("rect")
			.attr("fill", colorTopHeader)
			.attr("x", margin.left)
			.attr("y", margin.top + topHeaderHeight)
			.attr("width", secHeaderBlankRectWidth)
			.attr("height", topHeaderHeight)
			.attr("stroke", secHeaderStroke)
			.attr("stroke-width", strokeWidth);
			
		gSecHeader.append("rect")
			.attr("fill", colorTopHeader)
			.attr("x", margin.left + secHeaderBlankRectWidth)
			.attr("y", margin.top + topHeaderHeight)
			.attr("width", 3*secHeaderBlankRectWidth)
			.attr("height", topHeaderHeight)
			.attr("stroke", secHeaderStroke)
			.attr("stroke-width", strokeWidth)
			.on("mouseover", displayAll)
			.on("mouseout", displayAllResetColor);
			
		gSecHeader.append("text")
			.attr("class", "c")
			.attr("x", margin.left + (4*secHeaderBlankRectWidth)/2)
			.attr("y", (margin.top + topHeaderHeight) + topHeaderHeight/2)
			.text(prodCatHeader);
		
		gSecHeader.append("rect")
			.attr("fill", colorBaseline)
			.attr("x", margin.left + 4*secHeaderBlankRectWidth)
			.attr("y", margin.top + topHeaderHeight)
			.attr("width", secHeaderGenericRectWidth)
			.attr("height", topHeaderHeight)
			.attr("stroke", secHeaderStroke)
			.on("mouseover",displayBaseline)
			.on("mouseout", displayBaselineMouseOut)
			.attr("stroke-width", strokeWidth);
			
			baselineText = gSecHeader.append("text")
				.attr("class", "black_text")
				.attr("x", margin.left + 4*secHeaderBlankRectWidth + 0.1* secHeaderGenericRectWidth)
				.attr("y", margin.top + topHeaderHeight + topHeaderHeight/4)
				.text(baselineSubHeader1 + " " + baselineSubHeader2);

			d3plus.textwrap()
				.container(baselineText)
				.draw();
		
			
		gSecHeader.append("rect")
			.attr("fill", colorCurrent)
			.attr("x", margin.left + 4*secHeaderBlankRectWidth + secHeaderGenericRectWidth)
			.attr("y", margin.top + topHeaderHeight)
			.attr("width", secHeaderGenericRectWidth)
			.attr("height", topHeaderHeight)
			.attr("stroke", secHeaderStroke)
			.on("mouseover", displayCurrent)
			.on("mouseout", displayCurrentMouseOut)
			.attr("stroke-width", strokeWidth);

			currentText = gSecHeader.append("text")
				.attr("class", "black_text")
				.attr("x", margin.left + 4*secHeaderBlankRectWidth + secHeaderGenericRectWidth + 0.1 * secHeaderGenericRectWidth)
				.attr("y", margin.top + topHeaderHeight + topHeaderHeight/4)
				.text(currSubHeader1 + " " + currSubHeader2);			
			
			d3plus.textwrap()
				.container(currentText)
				.draw();

		gSecHeader.append("rect")
			.attr("fill", colorPlanned)
			.attr("x", margin.left + 4*secHeaderBlankRectWidth + 2*secHeaderGenericRectWidth)
			.attr("y", margin.top + topHeaderHeight)
			.attr("width", secHeaderGenericRectWidth)
			.attr("height", topHeaderHeight)
			.attr("stroke", secHeaderStroke)
			.attr("stroke-width", strokeWidth)
			.on("mouseover", displayPlanned)
			.on("mouseout", displayPlannedMouseOut);

			plannedText = gSecHeader.append("text")
				.attr("class", "black_text")
				.attr("x", margin.left + 4*secHeaderBlankRectWidth + 2*secHeaderGenericRectWidth + 0.1 * secHeaderGenericRectWidth)
				.attr("y", margin.top + topHeaderHeight + topHeaderHeight/4)
				.text(planSubHeader1 + " " + planSubHeader2);			
				
			d3plus.textwrap()
				.container(plannedText)
				.draw();
			
		gSecHeader.append("rect")
			.attr("fill", colorNone)
			.attr("x", margin.left + 4*secHeaderBlankRectWidth + 3*secHeaderGenericRectWidth)
			.attr("y", margin.top + topHeaderHeight)
			.attr("width", secHeaderGenericRectWidth/2)
			.attr("height", topHeaderHeight)
			.attr("stroke", secHeaderStroke)
			.attr("stroke-width", strokeWidth);
			
		gSecHeader.append("text")
			.attr("class", "black_text")
			.attr("x", margin.left + 4*secHeaderBlankRectWidth + 3*secHeaderGenericRectWidth + 5)
			.attr("y", margin.top + topHeaderHeight + topHeaderHeight/2)
			.text(noneHeader);
			
		gSecHeader.append("rect")
			.attr("fill", colorBronze)
			.attr("x", margin.left + 4*secHeaderBlankRectWidth + 3*secHeaderGenericRectWidth + secHeaderGenericRectWidth/2)
			.attr("y", margin.top + topHeaderHeight)
			.attr("width", 2*secHeaderGenericRectWidth/2)
			.attr("height", topHeaderHeight)
			.attr("stroke", secHeaderStroke)
			.attr("stroke-width", strokeWidth);
			
			bronzeText = gSecHeader.append("text")
				.attr("class", "black_text")
				.attr("x", margin.left + 4*secHeaderBlankRectWidth + 3*secHeaderGenericRectWidth + secHeaderGenericRectWidth/2 + 0.1 * secHeaderGenericRectWidth)
				.attr("y", margin.top + topHeaderHeight + topHeaderHeight/4)
				.text(insuffSubHeader1 + " " + insuffSubHeader2);			
				
			d3plus.textwrap()
				.container(bronzeText)
				.draw();
			
		gSecHeader.append("rect")
			.attr("fill", colorSilver)
			.attr("x", margin.left + 4*secHeaderBlankRectWidth + 4*secHeaderGenericRectWidth + secHeaderGenericRectWidth/2)
			.attr("y", margin.top + topHeaderHeight)
			.attr("width", 3*secHeaderGenericRectWidth/2)
			//.attr("width", secHeaderGenericRectWidth)
			.attr("height", topHeaderHeight)
			.attr("stroke", secHeaderStroke)
			.attr("stroke-width", strokeWidth);	
			
			silverText = gSecHeader.append("text")
				.attr("class", "black_text")
				.attr("x", margin.left + 4*secHeaderBlankRectWidth + 4*secHeaderGenericRectWidth + secHeaderGenericRectWidth/2 
						+ 0.1 * secHeaderGenericRectWidth)
				.attr("y", margin.top + topHeaderHeight + topHeaderHeight/4)
				.text(typicalSubHeader1 + " " + typicalSubHeader2);			
			
			d3plus.textwrap()
				.container(silverText)
				.draw();



		gSecHeader.append("rect")
			.attr("fill", colorGold)
			.attr("x", margin.left + 4*secHeaderBlankRectWidth + 4*secHeaderGenericRectWidth + secHeaderGenericRectWidth/2 + 3*secHeaderGenericRectWidth/2)
			.attr("y", margin.top + topHeaderHeight)
			.attr("width", 2*secHeaderGenericRectWidth/2)
			.attr("height", topHeaderHeight)
			.attr("stroke", secHeaderStroke)
			.attr("stroke-width", strokeWidth);

			goldText = gSecHeader.append("text")
				.attr("class", "black_text")
				.attr("x", margin.left + 4*secHeaderBlankRectWidth + 4*secHeaderGenericRectWidth + secHeaderGenericRectWidth/2 
					+ 3*secHeaderGenericRectWidth/2 + 0.1 * secHeaderGenericRectWidth)
				.attr("y", margin.top + topHeaderHeight + topHeaderHeight/4)
				.text(advGoldSubHeader1+ "  " + advGoldSubHeader2);			
			
			d3plus.textwrap()
				.container(goldText)
				.draw();
			
		gSecHeader.append("rect")
			.attr("fill", colorDiamond)
			.attr("x", margin.left + 4*secHeaderBlankRectWidth + 4*secHeaderGenericRectWidth + secHeaderGenericRectWidth/2 + 3*secHeaderGenericRectWidth/2
					+ secHeaderGenericRectWidth)
			.attr("y", margin.top + topHeaderHeight)
			.attr("width", 2*secHeaderGenericRectWidth/2)
			.attr("height", topHeaderHeight)
			.attr("stroke", secHeaderStroke)
			.attr("stroke-width", strokeWidth);			

			diamondText = gSecHeader.append("text")
				.attr("class", "black_text")
				.attr("x", margin.left + 4*secHeaderBlankRectWidth + 4*secHeaderGenericRectWidth + secHeaderGenericRectWidth/2 + 3*secHeaderGenericRectWidth/2
					+ secHeaderGenericRectWidth + 0.08 * secHeaderGenericRectWidth)
				.attr("y", margin.top + topHeaderHeight + topHeaderHeight/4)
				.text(diffSubHeader1 + " " + diffSubHeader2);			
				
			d3plus.textwrap()
				.container(diamondText)
				.draw();
			
		/////////////////////////////////////////////////////////////
		// THIS SECTION BUILD THE ROWS DYNAMICALLY BASED ON THE DATA 
		/////////////////////////////////////////////////////////////

		//d3.csv("analytics_maturity_model_data.csv", function (myArrayOfObjects){
		d3.csv(amm_d3_data + '?' + Math.floor(Math.random() * 1000), function (myArrayOfObjects){ 
        //console.log(myArrayOfObjects[0]);
		var prodCatGroup = d3.nest()
			.key(function(d) {return d.product_category;})
			.rollup(function(v) {return v.length;})
			.entries(myArrayOfObjects);
		
		//console.log(prodCatGroup);
		//console.log(myArrayOfObjects);

		numMinorRows=0;
		verticalOffset = 0;
		prodCatNum = 0;
		prodCatGroup.forEach(function(prodCat) {
			var gProdCat = svg.append("g");
		
			gProdCat.append("rect")
			.attr("fill", colorWhite)
			.attr("x", margin.left)
			.attr("y", margin.top + 2*topHeaderHeight + numMinorRows*individualRowHeight)
			.attr("width", secHeaderBlankRectWidth)
			.attr("height", individualRowHeight*prodCat.values)
			.attr("stroke", colorTopHeader)
			.attr("stroke-width", strokeWidth)
			.attr("id", "pc_"+prodCatNum)
			.on("mouseover", handleMouseOverProdCat)
			.on("mouseout", handleMouseOutProdCat);
			
			var txtProdCat=
			gProdCat.append("text")
			.attr("class", "black_text_smaller")
			.attr("x", margin.left + 0.1*secHeaderBlankRectWidth)
			.attr("y", margin.top + 2*topHeaderHeight + numMinorRows*individualRowHeight + 0.5*(individualRowHeight*prodCat.values))
			.text(prodCat.key);
			//.attr("style", "inline-size: 75%");
			//console.log(prodCat.key)
			if(prodCat.key != "Quality & Saftey")
			{
				d3plus.textwrap()
					.container(txtProdCat)
					.draw();
			}
			
			numMinorRows += prodCat.values;
			//prodCatNum++;
			
			// build the detail section of each row
			var pList = [];
			myArrayOfObjects.forEach(function(prodDet) {
				
				if(prodCat.key == prodDet.product_category)
				{
					pList.push({"voff":verticalOffset, "baseline":prodDet.baseline, "current":prodDet.current, "planned":prodDet.planned});
					
					//build the details
					//alert(prodDet.product);
					gProdCat.append("rect")
					.attr("fill", colorWhite)
					.attr("x", margin.left + secHeaderBlankRectWidth)
					.attr("y", margin.top + 2*topHeaderHeight + verticalOffset*individualRowHeight)
					.attr("width", 3*secHeaderBlankRectWidth)
					.attr("height", individualRowHeight)
					.attr("stroke", colorTopHeader)
					.attr("stroke-width", strokeWidth)
					.attr("id", "rect_" + verticalOffset + "_prod_" + prodDet.baseline + "_" + prodDet.current + "_" + prodDet.planned)
					.on("mouseover", handleMouseOverProd)
					.on("mouseout", handleMouseOutProd);
					
					gProdCat.append("text")
					.attr("class", "black_text_smallest")
					.attr("x", margin.left + secHeaderBlankRectWidth + 0.1*secHeaderBlankRectWidth)
					.attr("y", margin.top + 2*topHeaderHeight + verticalOffset*individualRowHeight + 0.5*individualRowHeight)
					.text(prodDet.product);
					
					//baseline
					gProdCat.append("rect")
					.attr("fill", colorBaseline)
					.attr("x", margin.left + secHeaderBlankRectWidth + 3*secHeaderBlankRectWidth)
					.attr("y", margin.top + 2*topHeaderHeight + verticalOffset*individualRowHeight)
					.attr("width", secHeaderGenericRectWidth)
					.attr("height", individualRowHeight)
					.attr("stroke", colorTopHeader)
					.attr("stroke-width", strokeWidth)
					.attr("id", "rect_" + verticalOffset + "_b_"+ prodDet.baseline)
					.on("mouseover", handleMouseOverBaseline)
					.on("mouseout", handleMouseOutBaseline);
					
					gProdCat.append("text")
					.attr("class", "green_text")
					.attr("x", margin.left + secHeaderBlankRectWidth + 3*secHeaderBlankRectWidth + 0.5*secHeaderGenericRectWidth)
					.attr("y", margin.top + 2*topHeaderHeight + verticalOffset*individualRowHeight + 0.5*individualRowHeight)
					//.attr("text-anchor", "middle")
					//.attr("alignment-baseline", "central")
					.text(prodDet.baseline);
					
					//current
					gProdCat.append("rect")
					.attr("fill", colorCurrent)
					.attr("x", margin.left + secHeaderBlankRectWidth + 3*secHeaderBlankRectWidth + secHeaderGenericRectWidth)
					.attr("y", margin.top + 2*topHeaderHeight + verticalOffset*individualRowHeight)
					.attr("width", secHeaderGenericRectWidth)
					.attr("height", individualRowHeight)
					.attr("stroke", colorTopHeader)
					.attr("stroke-width", strokeWidth)
					.attr("id", "rect_" + verticalOffset + "_c_"+ prodDet.current)
					.on("mouseover", handleMouseOverCurrent)
					.on("mouseout", handleMouseOutCurrent);
					
					gProdCat.append("text")
					.attr("class", "blue_text")
					.attr("x", margin.left + secHeaderBlankRectWidth + 3*secHeaderBlankRectWidth + secHeaderGenericRectWidth 
							+ 0.5*secHeaderGenericRectWidth)
					.attr("y", margin.top + 2*topHeaderHeight + verticalOffset*individualRowHeight + 0.5*individualRowHeight)
					.text(prodDet.current);
					
					//planned
					gProdCat.append("rect")
					.attr("fill", colorPlanned)
					.attr("x", margin.left + secHeaderBlankRectWidth + 3*secHeaderBlankRectWidth + secHeaderGenericRectWidth + secHeaderGenericRectWidth)
					.attr("y", margin.top + 2*topHeaderHeight + verticalOffset*individualRowHeight)
					.attr("width", secHeaderGenericRectWidth)
					.attr("height", individualRowHeight)
					.attr("stroke", colorTopHeader)
					.attr("stroke-width", strokeWidth)	
					.attr("id", "rect_" + verticalOffset + "_p_"+ prodDet.planned)
					.on("mouseover", handleMouseOverPlanned)
					.on("mouseout", handleMouseOutPlanned);
					
					
					gProdCat.append("text")
					.attr("class", "orange_text")
					.attr("x", margin.left + secHeaderBlankRectWidth + 3*secHeaderBlankRectWidth + secHeaderGenericRectWidth + secHeaderGenericRectWidth
							+ 0.5*secHeaderGenericRectWidth)
					.attr("y", margin.top + 2*topHeaderHeight + verticalOffset*individualRowHeight + 0.5*individualRowHeight)
					.text(prodDet.planned);
					
					//none
					gProdCat.append("rect")
					.attr("fill", colorNone)
					.attr("x", margin.left + secHeaderBlankRectWidth + 3*secHeaderBlankRectWidth + secHeaderGenericRectWidth + secHeaderGenericRectWidth
							+ secHeaderGenericRectWidth)
					.attr("y", margin.top + 2*topHeaderHeight + verticalOffset*individualRowHeight)
					.attr("width", secHeaderGenericRectWidth/2)
					.attr("height", individualRowHeight)
					.attr("stroke", colorTopHeader)
					.attr("stroke-width", strokeWidth);
					
					//insufficient 1
					gProdCat.append("rect")
					.attr("fill", colorBronze)
					.attr("x", margin.left + secHeaderBlankRectWidth + 3*secHeaderBlankRectWidth + secHeaderGenericRectWidth + secHeaderGenericRectWidth
							+ secHeaderGenericRectWidth + secHeaderGenericRectWidth/2)
					.attr("y", margin.top + 2*topHeaderHeight + verticalOffset*individualRowHeight)
					.attr("width", secHeaderGenericRectWidth/2)
					.attr("height", individualRowHeight)
					.attr("stroke", colorTopHeader)
					.attr("stroke-width", strokeWidth);
					
					//insufficient 1
					gProdCat.append("rect")
					.attr("fill", colorBronze)
					.attr("x", margin.left + secHeaderBlankRectWidth + 3*secHeaderBlankRectWidth + secHeaderGenericRectWidth + secHeaderGenericRectWidth
							+ secHeaderGenericRectWidth + secHeaderGenericRectWidth/2 + secHeaderGenericRectWidth/2)
					.attr("y", margin.top + 2*topHeaderHeight + verticalOffset*individualRowHeight)
					.attr("width", secHeaderGenericRectWidth/2)
					.attr("height", individualRowHeight)
					.attr("stroke", colorTopHeader)
					.attr("stroke-width", strokeWidth);		

					//typical 1
					gProdCat.append("rect")
					.attr("fill", colorSilver)
					.attr("x", margin.left + secHeaderBlankRectWidth + 3*secHeaderBlankRectWidth + secHeaderGenericRectWidth + secHeaderGenericRectWidth
							+ secHeaderGenericRectWidth + secHeaderGenericRectWidth/2 + secHeaderGenericRectWidth/2 + secHeaderGenericRectWidth/2)
					.attr("y", margin.top + 2*topHeaderHeight + verticalOffset*individualRowHeight)
					.attr("width", secHeaderGenericRectWidth/2)
					.attr("height", individualRowHeight)
					.attr("stroke", colorTopHeader)
					.attr("stroke-width", strokeWidth);	
					
					//typical 2
					gProdCat.append("rect")
					.attr("fill", colorSilver)
					.attr("x", margin.left + secHeaderBlankRectWidth + 3*secHeaderBlankRectWidth + secHeaderGenericRectWidth + secHeaderGenericRectWidth
							+ secHeaderGenericRectWidth + secHeaderGenericRectWidth/2 + secHeaderGenericRectWidth/2 + secHeaderGenericRectWidth/2
							+ secHeaderGenericRectWidth/2)
					.attr("y", margin.top + 2*topHeaderHeight + verticalOffset*individualRowHeight)
					.attr("width", secHeaderGenericRectWidth/2)
					.attr("height", individualRowHeight)
					.attr("stroke", colorTopHeader)
					.attr("stroke-width", strokeWidth);	
					
					//typical 3
					gProdCat.append("rect")
					.attr("fill", colorSilver)
					.attr("x", margin.left + secHeaderBlankRectWidth + 3*secHeaderBlankRectWidth + secHeaderGenericRectWidth + secHeaderGenericRectWidth
							+ secHeaderGenericRectWidth + secHeaderGenericRectWidth/2 + secHeaderGenericRectWidth/2 + secHeaderGenericRectWidth/2
							+ secHeaderGenericRectWidth/2 + secHeaderGenericRectWidth/2)
					.attr("y", margin.top + 2*topHeaderHeight + verticalOffset*individualRowHeight)
					.attr("width", secHeaderGenericRectWidth/2)
					.attr("height", individualRowHeight)
					.attr("stroke", colorTopHeader)
					.attr("stroke-width", strokeWidth);	
					
					//gold 1
					gProdCat.append("rect")
					.attr("fill", colorGold)
					.attr("x", margin.left + secHeaderBlankRectWidth + 3*secHeaderBlankRectWidth + secHeaderGenericRectWidth + secHeaderGenericRectWidth
							+ secHeaderGenericRectWidth + secHeaderGenericRectWidth/2 + secHeaderGenericRectWidth/2 + secHeaderGenericRectWidth/2
							+ secHeaderGenericRectWidth/2 + secHeaderGenericRectWidth/2 + secHeaderGenericRectWidth/2)
					.attr("y", margin.top + 2*topHeaderHeight + verticalOffset*individualRowHeight)
					.attr("width", secHeaderGenericRectWidth/2)
					.attr("height", individualRowHeight)
					.attr("stroke", colorTopHeader)
					.attr("stroke-width", strokeWidth);	
					
					//gold 2
					gProdCat.append("rect")
					.attr("fill", colorGold)
					.attr("x", margin.left + secHeaderBlankRectWidth + 3*secHeaderBlankRectWidth + secHeaderGenericRectWidth + secHeaderGenericRectWidth
							+ secHeaderGenericRectWidth + secHeaderGenericRectWidth/2 + secHeaderGenericRectWidth/2 + secHeaderGenericRectWidth/2
							+ secHeaderGenericRectWidth/2 + secHeaderGenericRectWidth/2 + secHeaderGenericRectWidth/2 + secHeaderGenericRectWidth/2)
					.attr("y", margin.top + 2*topHeaderHeight + verticalOffset*individualRowHeight)
					.attr("width", secHeaderGenericRectWidth/2)
					.attr("height", individualRowHeight)
					.attr("stroke", colorTopHeader)
					.attr("stroke-width", strokeWidth);
					
					//diamond 1
					gProdCat.append("rect")
					.attr("fill", colorDiamond)
					.attr("x", margin.left + secHeaderBlankRectWidth + 3*secHeaderBlankRectWidth + secHeaderGenericRectWidth + secHeaderGenericRectWidth
							+ secHeaderGenericRectWidth + secHeaderGenericRectWidth/2 + secHeaderGenericRectWidth/2 + secHeaderGenericRectWidth/2
							+ secHeaderGenericRectWidth/2 + secHeaderGenericRectWidth/2 + secHeaderGenericRectWidth/2 + secHeaderGenericRectWidth/2
							+ secHeaderGenericRectWidth/2)
					.attr("y", margin.top + 2*topHeaderHeight + verticalOffset*individualRowHeight)
					.attr("width", secHeaderGenericRectWidth/2)
					.attr("height", individualRowHeight)
					.attr("stroke", colorTopHeader)
					.attr("stroke-width", strokeWidth);
					
					//diamond 2
					gProdCat.append("rect")
					.attr("fill", colorDiamond)
					.attr("x", margin.left + secHeaderBlankRectWidth + 3*secHeaderBlankRectWidth + secHeaderGenericRectWidth + secHeaderGenericRectWidth
							+ secHeaderGenericRectWidth + secHeaderGenericRectWidth/2 + secHeaderGenericRectWidth/2 + secHeaderGenericRectWidth/2
							+ secHeaderGenericRectWidth/2 + secHeaderGenericRectWidth/2 + secHeaderGenericRectWidth/2 + secHeaderGenericRectWidth/2
							+ secHeaderGenericRectWidth/2 + secHeaderGenericRectWidth/2)
					.attr("y", margin.top + 2*topHeaderHeight + verticalOffset*individualRowHeight)
					.attr("width", secHeaderGenericRectWidth/2)
					.attr("height", individualRowHeight)
					.attr("stroke", colorTopHeader)
					.attr("stroke-width", strokeWidth);					

					displayCircles("baseline", prodDet.baseline, gProdCat, verticalOffset);				
					displayCircles("current", prodDet.current, gProdCat, verticalOffset);
					displayCircles("planned", prodDet.planned, gProdCat, verticalOffset);
					verticalOffset++;
				}
		});
		statusByProdCat[prodCatNum] = pList;
		prodCatNum++;	
		});
		
		var bPath = svg.append("path")
			.attr("id", baselinePath);
		var cPath = svg.append("path")
			.attr("id", currentPath);
		var pPath = svg.append("path")
			.attr("id", plannedPath);	
		
      });

    //console.log(baselineCoord);	
	//console.log(statusByProdCat);