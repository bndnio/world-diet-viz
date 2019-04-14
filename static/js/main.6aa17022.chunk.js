(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{160:function(e,t,a){e.exports=a(283)},165:function(e,t,a){},166:function(e,t,a){},244:function(e,t,a){},258:function(e,t,a){},274:function(e,t,a){},277:function(e,t,a){},278:function(e,t,a){},279:function(e,t,a){},283:function(e,t,a){"use strict";a.r(t);var n=a(1),r=a.n(n),i=a(10),o=a.n(i),c=(a(165),a(12)),s=a(13),l=a(15),u=a(14),p=a(16),d=(a(166),a(71),a(43)),h=(a(79),a(20)),f=a(65),m=(a(170),a(96)),g=a(34),y=(a(144),a(68)),b=(a(119),a(92)),v=a(29),O=a.n(v),j=a(36),x=n.createContext();function C(e){return function(t){return n.createElement(x.Consumer,null,function(a){return n.createElement(e,Object.assign({},t,{data:a}))})}}var E=n.createContext();function S(e){return function(t){return n.createElement(E.Consumer,null,function(a){return n.createElement(e,Object.assign({},t,{interaction:a}))})}}function k(){var e=Object(g.a)(["\n      {\n        countries\n      }\n    "]);return k=function(){return e},e}var w=b.a.Text,D=y.a.Option,A=S(C(function(e){function t(){var e,a;Object(c.a)(this,t);for(var n=arguments.length,r=new Array(n),i=0;i<n;i++)r[i]=arguments[i];return(a=Object(l.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(r)))).handleChange=function(e){a.props.data.setQuery({countries:e||[]}),a.props.interaction.setFields({availableCountries:e||[]})},a}return Object(p.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){var e=this,t=O()(k());return r.a.createElement(j.b,{query:t},function(t){var a=t.loading,n=t.error,i=t.data;if(a)return"Loading...";n&&console.log("Error loading gql data for CountryPicker");var o=i.countries;return r.a.createElement("div",null,r.a.createElement(w,null,"Country"),r.a.createElement(y.a,{mode:"multiple",style:{width:"100%"},placeholder:"Please select",defaultValue:[],onChange:e.handleChange,value:e.props.interaction.fields.availableCountries},o.map(function(e){return r.a.createElement(D,{key:e},e)})))})}}]),t}(n.Component))),Y=a(26),P=a(37),F=a(21),N=a(152),M=a.n(N),R=y.a.Option,L=function(e){return r.a.createElement(y.a,Object.assign({},e,{showSearch:!0,style:{width:200},placeholder:e.placeholder||"Select one",optionFilterProp:"children",onChange:function(t){e.handleChange(t)},filterOption:function(e,t){return t.props.children.toLowerCase().indexOf(e.toLowerCase())>=0}}),e.options.map(function(e,t){return r.a.createElement(R,{key:e.value||t,value:e.value||e},e.display||e)}))},q={"Grand Total - Animal Protein - Food supply":"Animal Protein","Grand Total - Carbs - Food supply":"Carbs","Grand Total - Fat - Food supply":"Fat","Grand Total - Food supply":"Grand Total","Grand Total - Plant Protein - Food supply":"Plant Protein","Grand Total - Protein - Food supply":"Protein"};a(244);function T(){var e=Object(g.a)(["\n      {\n        kcalRange {\n          max\n        }\n      }\n    "]);return T=function(){return e},e}var W={width:800,height:400,padding:50},X=function(e){function t(){return Object(c.a)(this,t),Object(l.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(p.a)(t,e),Object(s.a)(t,[{key:"componentDidMount",value:function(){this.renderXAxis()}},{key:"componentDidUpdate",value:function(){this.renderXAxis()}},{key:"renderXAxis",value:function(){var e=this.refs.axisContainer,t=F.a().ticks(5).tickFormat(F.e("d")).scale(this.props.scale);F.i(e).call(t)}},{key:"render",value:function(){return r.a.createElement("g",{className:"axis",ref:"axisContainer",transform:this.props.translate})}}]),t}(r.a.Component),G=function(e){function t(){return Object(c.a)(this,t),Object(l.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(p.a)(t,e),Object(s.a)(t,[{key:"componentDidMount",value:function(){this.renderYAxis()}},{key:"componentDidUpdate",value:function(){this.renderYAxis()}},{key:"renderYAxis",value:function(){var e=this.refs.axisContainer,t=(this.props.flip?F.c():F.b()).ticks(5).scale(this.props.scale);F.i(e).call(t)}},{key:"render",value:function(){return r.a.createElement("g",{className:"axis",ref:"axisContainer",transform:this.props.translate})}}]),t}(r.a.Component),U=function(e){function t(){return Object(c.a)(this,t),Object(l.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(p.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){return r.a.createElement("g",{className:"LE-xy-axis"},r.a.createElement(X,{translate:"translate(0, ".concat(this.props.height-this.props.padding,")"),scale:this.props.xScale}),r.a.createElement("text",{className:"axis",textAnchor:"middle",transform:"translate(".concat(W.width/2-this.props.padding/2,", ").concat(W.height-5,")")},"[year]"),r.a.createElement(G,{translate:"translate(".concat(this.props.padding,", 0)"),scale:this.props.yScale}),r.a.createElement("text",{className:"axis",textAnchor:"middle",transform:"translate(10, ".concat(W.height/2,"), rotate(-90)")},"[total kCal]"),r.a.createElement(G,{translate:"translate(".concat(W.width-this.props.padding,", 0)"),scale:this.props.otherYScale,flip:!0}),r.a.createElement("text",{className:"axis",textAnchor:"middle",transform:"translate(".concat(W.width-10,", ").concat(W.height/2,"), rotate(-90)")},"[Mean Age of Death]"))}}]),t}(r.a.Component),V=function(e){function t(){var e,a;Object(c.a)(this,t);for(var n=arguments.length,i=new Array(n),o=0;o<n;o++)i[o]=arguments[o];return(a=Object(l.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(i)))).renderLine=function(e,t){return r.a.createElement("line",{x1:a.props.xScale(e[0]),y1:a.props.yScale(e[1]),x2:a.props.xScale(e[2]),y2:a.props.yScale(e[3]),strokeWidth:1.5,stroke:a.props.color,key:t})},a}return Object(p.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){return r.a.createElement("g",null,this.props.data.map(this.renderLine))}}]),t}(r.a.Component),z=function(e){function t(){return Object(c.a)(this,t),Object(l.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(p.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){var e=this.props,t=e.xScale,a=e.yScale,n=e.data,i=e.color;return r.a.createElement(r.a.Fragment,null,r.a.createElement(B,{xScale:t,yScale:a,data:n,color:i}),r.a.createElement(V,{xScale:t,yScale:a,data:n,color:M()(i).darken(.1)}))}}]),t}(n.Component),B=function(e){function t(){var e,a;Object(c.a)(this,t);for(var n=arguments.length,i=new Array(n),o=0;o<n;o++)i[o]=arguments[o];return(a=Object(l.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(i)))).renderFillBottom=function(e,t){return r.a.createElement("polygon",{points:"\n        ".concat(a.props.xScale(e[0]),",").concat(a.props.yScale(0),"\n        ").concat(a.props.xScale(e[2]),",").concat(a.props.yScale(0),"\n        ").concat(a.props.xScale(e[2]),",").concat(a.props.yScale(e[3]),"\n        ").concat(a.props.xScale(e[0]),",").concat(a.props.yScale(e[1]),"\n        "),fill:a.props.color,key:t})},a}return Object(p.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){return r.a.createElement("g",null,this.props.data.map(this.renderFillBottom))}}]),t}(r.a.Component),Q=function(e){function t(){return Object(c.a)(this,t),Object(l.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(p.a)(t,e),Object(s.a)(t,[{key:"getXScale",value:function(){var e=this.props.interaction.fields.availableYears,t=e[0],a=e[e.length-1];return F.h().domain([t,a]).range([this.props.padding,this.props.width-this.props.padding])}},{key:"getDataYScale",value:function(){return F.h().domain([0,this.props.kcalMax]).range([this.props.height-this.props.padding,this.props.padding/2])}},{key:"getDeathYScale",value:function(){return F.h().domain([20,80]).range([this.props.height-this.props.padding,this.props.padding/2])}},{key:"render",value:function(){var e=this.getXScale(),t=this.getDataYScale(),a=this.getDeathYScale();return r.a.createElement("svg",{width:this.props.width,height:this.props.height},r.a.createElement(z,{xScale:e,yScale:t,data:this.props.measure4,color:"#70b678"}),r.a.createElement(z,{xScale:e,yScale:t,data:this.props.measure3,color:"#bbdbad"}),r.a.createElement(z,{xScale:e,yScale:t,data:this.props.measure2,color:"#c79fc8"}),r.a.createElement(z,{xScale:e,yScale:t,data:this.props.measure1,color:"#f4a58a"}),r.a.createElement(V,Object.assign({xScale:e,yScale:a},this.props,{data:this.props.lifeExpData,color:"#444444"})),r.a.createElement(U,Object.assign({xScale:e,yScale:t,otherYScale:a},this.props)))}}]),t}(r.a.Component),I=S(C(function(e){function t(){return Object(c.a)(this,t),Object(l.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(p.a)(t,e),Object(s.a)(t,[{key:"componentWillMount",value:function(){this.processData()}},{key:"componentDidUpdate",value:function(e){e.data.data===this.props.data.data&&e.interaction.fields.selectedCountry===this.props.interaction.fields.selectedCountry||this.processData()}},{key:"processData",value:function(){var e=this.props.interaction.fields.selectedCountry,t=[];e&&(t=this.props.data.data.map(function(t){return[t.year,t.countries.filter(function(t){return t.country===e})[0].items.reduce(function(e,t){var a;return Object(P.a)({},e,(a={},Object(Y.a)(a,q[t.name],t.value),Object(Y.a)(a,"lifeExp",t.lifeExp),a))},{})]})),this.setState({data:t,totalData:t.map(function(e,t,a){return 0===t?void 0:[e[0],e[1]["Grand Total"],a[t-1][0],a[t-1][1]["Grand Total"]]}).filter(function(e){return!!e}),lifeExpData:t.map(function(e,t,a){return 0===t?void 0:[e[0],e[1].lifeExp,a[t-1][0],a[t-1][1].lifeExp]}).filter(function(e){return!!e}),carbData:t.map(function(e,t,a){return 0===t?void 0:[e[0],e[1].Carbs,a[t-1][0],a[t-1][1].Carbs]}).filter(function(e){return!!e}),fatData:t.map(function(e,t,a){return 0===t?void 0:[e[0],e[1].Carbs+e[1].Fat,a[t-1][0],a[t-1][1].Carbs+a[t-1][1].Fat]}).filter(function(e){return!!e}),animalProteinData:t.map(function(e,t,a){return 0===t?void 0:[e[0],e[1].Carbs+e[1].Fat+e[1]["Animal Protein"],a[t-1][0],a[t-1][1].Carbs+a[t-1][1].Fat+a[t-1][1]["Animal Protein"]]}).filter(function(e){return!!e}),plantProteinData:t.map(function(e,t,a){return 0===t?void 0:[e[0],e[1].Carbs+e[1].Fat+e[1]["Animal Protein"]+e[1]["Plant Protein"],a[t-1][0],a[t-1][1].Carbs+a[t-1][1].Fat+a[t-1][1]["Animal Protein"]+a[t-1][1]["Plant Protein"]]}).filter(function(e){return!!e})})}},{key:"render",value:function(){var e=this,t=O()(T());return r.a.createElement(d.a,{size:"small",bodyStyle:{width:824,height:424},title:"Life Expectancy v. Total kCal Consumption",extra:r.a.createElement(L,{options:this.props.interaction.fields.availableCountries||[],handleChange:function(t){return e.props.interaction.setFields({selectedCountry:t})},disabled:!!this.props.data.loading||!this.props.interaction.fields.availableCountries,placeholder:"Select Country"})},r.a.createElement(j.b,{query:t},function(t){var a=t.loading,n=t.error,i=t.data;if(a||e.props.data.loading)return"Loading...";n&&console.log("Error loading gql data for LineChart");var o=i.kcalRange.max;return e.props.interaction.fields.selectedCountry?r.a.createElement(Q,Object.assign({},e.props,{data:e.state.totalData,lifeExpData:e.state.lifeExpData,measure1:e.state.carbData,measure2:e.state.fatData,measure3:e.state.animalProteinData,measure4:e.state.plantProteinData,kcalMax:o},W)):"select a country"}))}}]),t}(r.a.Component))),J=(a(141),a(93)),K=(a(258),S(C(function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(l.a)(this,Object(u.a)(t).call(this,e))).handleChange=function(e){a.props.interaction.setFields({selectedYear:e})},a.props.interaction.setFields({selectedYear:a.props.interaction.fields.availableYears[0]}),a}return Object(p.a)(t,e),Object(s.a)(t,[{key:"componentDidUpdate",value:function(e){var t=this.props.interaction.fields,a=t.selectedYear,n=t.availableYears;n[0]>a&&this.handleChange(n[0]),n[n.length-1]<a&&this.handleChange(n[n.length-1])}},{key:"render",value:function(){var e,t=this.props.interaction.fields,a=t.availableYears,n=t.selectedYear,i=a[0],o=a[a.length-1];return r.a.createElement(J.a,{min:i,max:o,marks:(e={},Object(Y.a)(e,i,i),Object(Y.a)(e,o,o),e),onChange:this.handleChange,onAfterChange:this.handleRelease,value:n||i,style:{width:100},disabled:this.props.disabled})}}]),t}(n.Component))));a(274);function $(){var e=Object(g.a)(["\n      {\n        kcalRange {\n          min\n          max\n        }\n        lifeExpRange(countries: ",") {\n          min\n          max\n        }\n      }\n    "]);return $=function(){return e},e}var _={width:500,height:400,padding:50},H=function(e){function t(){return Object(c.a)(this,t),Object(l.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(p.a)(t,e),Object(s.a)(t,[{key:"componentDidMount",value:function(){this.renderXAxis()}},{key:"componentDidUpdate",value:function(){this.renderXAxis()}},{key:"renderXAxis",value:function(){var e=this.refs.axisContainer,t=F.a().ticks(5).tickFormat(F.e("d")).scale(this.props.scale);F.i(e).call(t)}},{key:"render",value:function(){return r.a.createElement("g",{className:"axis",ref:"axisContainer",transform:this.props.translate})}}]),t}(r.a.Component),Z=function(e){function t(){return Object(c.a)(this,t),Object(l.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(p.a)(t,e),Object(s.a)(t,[{key:"componentDidMount",value:function(){this.renderYAxis()}},{key:"componentDidUpdate",value:function(){this.renderYAxis()}},{key:"renderYAxis",value:function(){var e=this.refs.axisContainer,t=(this.props.flip?F.c():F.b()).ticks(5).scale(this.props.scale);F.i(e).call(t)}},{key:"render",value:function(){return r.a.createElement("g",{className:"axis",ref:"axisContainer",transform:this.props.translate})}}]),t}(r.a.Component),ee=function(e){function t(){return Object(c.a)(this,t),Object(l.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(p.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){return r.a.createElement("g",{className:"LE-xy-axis"},r.a.createElement(H,{translate:"translate(0, ".concat(this.props.height-this.props.padding,")"),scale:this.props.xScale}),r.a.createElement("text",{className:"axis",textAnchor:"middle",transform:"translate(".concat(_.width/2-this.props.padding/2,", ").concat(_.height-10,")")},"[Total KCals]"),r.a.createElement(Z,{translate:"translate(".concat(this.props.padding,", 0)"),scale:this.props.yScale}),r.a.createElement("text",{className:"axis",textAnchor:"middle",transform:"translate(10, ".concat(_.height/2,"), rotate(-90)")},"[Life Expectancy]"))}}]),t}(r.a.Component),te=function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(l.a)(this,Object(u.a)(t).call(this,e))).getCircleRadius=function(e){return 2.5*Math.sqrt(e/Math.PI)},a.renderCircle=function(e,t){return r.a.createElement("svg",{key:t},r.a.createElement("circle",{cx:a.props.xScale(e[2]),cy:a.props.yScale(e[3]),r:3,fill:a.state.hovered===t?"red":a.props.color,onMouseOver:function(){return a.setState({hovered:t})},onMouseOut:function(){return a.setState({hovered:void 0})}}),r.a.createElement("text",{className:"data_labels",x:a.props.xScale(e[2]),y:a.props.yScale(e[3])-3},e[0]))},a.state={hovered:void 0},a}return Object(p.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){return r.a.createElement("g",null,this.props.data.map(this.renderCircle))}}]),t}(r.a.Component),ae=function(e){function t(){return Object(c.a)(this,t),Object(l.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(p.a)(t,e),Object(s.a)(t,[{key:"getXScale",value:function(){return F.h().domain(this.props.xRange).range([this.props.padding,this.props.width-this.props.padding/2])}},{key:"getDataYScale",value:function(){return F.h().domain(this.props.yRange).range([this.props.height-this.props.padding,this.props.padding/2])}},{key:"render",value:function(){var e=this.getXScale(),t=this.getDataYScale();return r.a.createElement("svg",{width:this.props.width,height:this.props.height},r.a.createElement(te,Object.assign({xScale:e,yScale:t},this.props,{data:this.props.data,color:"#80b0ff"})),r.a.createElement(ee,Object.assign({xScale:e,yScale:t},this.props)))}}]),t}(r.a.Component),ne=S(C(function(e){function t(){var e,a;Object(c.a)(this,t);for(var n=arguments.length,r=new Array(n),i=0;i<n;i++)r[i]=arguments[i];return(a=Object(l.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(r)))).state={data:[]},a}return Object(p.a)(t,e),Object(s.a)(t,[{key:"componentDidUpdate",value:function(e){e.data.data===this.props.data.data&&e.interaction.fields.availableCountries===this.props.interaction.fields.availableCountries&&e.interaction.fields.selectedYear===this.props.interaction.fields.selectedYear||this.processData()}},{key:"processData",value:function(){var e=this,t=this.props.interaction.fields.availableCountries,a=[];0!==this.props.data.data.length&&0!==t.length&&(a=this.props.data.data.map(function(e){return[e.year,e.countries.filter(function(e){return t.includes(e.country)}).map(function(t){return t.items.reduce(function(e,t){var a;return Object(P.a)({},e,(a={},Object(Y.a)(a,q[t.name],t.value),Object(Y.a)(a,"lifeExp",t.lifeExp),a))},{country:t.country,year:e.year})})]}).filter(function(t){return t[0]===e.props.interaction.fields.selectedYear})[0][1].map(function(e){return[e.country,e.year,e["Grand Total"],e.lifeExp]})),this.setState({data:a||[]})}},{key:"render",value:function(){var e=this,t=O()($(),JSON.stringify(this.props.interaction.fields.availableCountries));return r.a.createElement("div",{id:"scatterplot"},r.a.createElement(d.a,{size:"small",bodyStyle:{width:524,height:424},title:"Life Expectancy v. Total kcal",extra:r.a.createElement(K,{disabled:!!this.props.data.loading})},r.a.createElement(j.b,{query:t},function(t){var a=t.loading,n=t.error,i=t.data;if(a||e.props.data.loading)return"Loading...";n&&console.log("Error loading gql data for WaterfallConfig");var o=i.kcalRange,c=i.lifeExpRange;return r.a.createElement(ae,Object.assign({data:e.state.data,xRange:[o.min,o.max],yRange:[c.min,c.max]},_))})))}}]),t}(n.Component))),re=a(156),ie=a(67),oe=a.n(ie),ce=a(91),se=(a(277),["ALIGN","FOLLOW"]),le=function(e){function t(){var e,a;Object(c.a)(this,t);for(var n=arguments.length,r=new Array(n),i=0;i<n;i++)r[i]=arguments[i];return(a=Object(l.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(r)))).renderAxis=function(){var e=a.refs.axisContainer,t=("bottom"===a.props.orient?F.a():"top"===a.props.orient?F.d():"left"===a.props.orient?F.b():null).ticks(5).scale(a.props.scale);F.i(e).call(t)},a}return Object(p.a)(t,e),Object(s.a)(t,[{key:"componentDidMount",value:function(){this.renderAxis()}},{key:"componentDidUpdate",value:function(){this.renderAxis()}},{key:"render",value:function(){return r.a.createElement("g",{className:"axis",ref:"axisContainer",transform:this.props.translate})}}]),t}(r.a.Component),ue=function(e){function t(){return Object(c.a)(this,t),Object(l.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(p.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){var e=this.props.settings,t=e.padding,a=e.width,n=e.height,i=e.mode;return r.a.createElement("g",{className:"xy-axis"},r.a.createElement(le,{translate:"translate(0, ".concat(t,")"),scale:this.props.xScale,orient:"top"}),r.a.createElement("text",{className:"axis",textAnchor:"middle",transform:"translate(".concat(a/2,", 15)")},"[kCal / person / day]"),r.a.createElement(le,{translate:i===se[1]?"translate(".concat(t,", 0)"):"translate(".concat(a/2,", 0)"),scale:this.props.yScale,orient:"left"}),r.a.createElement("text",{className:"axis",textAnchor:"middle",transform:i===se[1]?"translate(".concat(t,", ").concat(n-t+20,"), rotate(-90)"):"translate(".concat(a/2,", ").concat(n-t+15,")")},"[year]"))}}]),t}(r.a.Component),pe=function(e){function t(){var e,a;Object(c.a)(this,t);for(var n=arguments.length,i=new Array(n),o=0;o<n;o++)i[o]=arguments[o];return(a=Object(l.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(i)))).renderRect=function(e){var t=a.props.settings;if(t.mode===se[0])var n=t.width/2-a.props.xScale(e.xDiff),i=Math.abs(n),o=n>0?a.props.xScale(e.xDiff):t.width/2;else t.mode===se[1]&&(n=a.props.xScale(e.xAbs)-a.props.xScale(e.xLast),i=Math.abs(n),o=e.xDiff>0?a.props.xScale(e.xLast):a.props.xScale(e.xAbs));return r.a.createElement("rect",{x:o,y:a.props.yScale(e.year),width:i,height:(t.height-2*t.padding)/t.numDataPoints,className:e.xDiff>0?"goodBar":"badBar",key:1*Math.random()})},a.renderRectText=function(e){var t=a.props.settings;if(t.mode===se[0])var n=t.width/2-a.props.xScale(e.xDiff),i=t.width/2-n;else t.mode===se[1]&&(n=a.props.xScale(e.xAbs)-a.props.xScale(e.xLast),i=a.props.xScale(e.xLast)+(e.xDiff>0?3:-3));return r.a.createElement("text",{textAnchor:e.xDiff>0?"start":"end",x:i,y:a.props.yScale(e.year)+t.height/t.numDataPoints/2+3,key:1*Math.random()},e.xDiff>0&&"+",e.xDiff.toFixed(1))},a}return Object(p.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){return r.a.createElement("g",null,this.props.data.map(this.renderRect),this.props.data.map(this.renderRectText))}}]),t}(r.a.Component),de=function(e){function t(){var e,a;Object(c.a)(this,t);for(var n=arguments.length,r=new Array(n),i=0;i<n;i++)r[i]=arguments[i];return(a=Object(l.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(r)))).getXScale=function(){var e=a.props.settings;if(e.mode===se[0])var t=F.g(a.props.data,function(e){return e.xDiff}),n=F.f(a.props.data,function(e){return e.xDiff});else e.mode===se[1]&&(t=F.g(a.props.data.map(function(e){return[e.xAbs,e.xLast]}).flat()),n=F.f(a.props.data.map(function(e){return[e.xAbs,e.xLast]}).flat()));var r=F.f([Math.abs(t),Math.abs(n)]);return F.h().domain([e.mode===se[0]?-r:t,r]).range([e.padding,e.width-e.padding])},a.getYScale=function(){var e=a.props.settings,t=F.g(a.props.data,function(e){return e.year}),n=F.f(a.props.data,function(e){return e.year});return F.h().domain([t,n+1]).range([e.padding,e.height-e.padding])},a}return Object(p.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){var e=this.props.settings,t=this.props.xScale||this.getXScale(),a=this.props.xScale||this.getYScale();return r.a.createElement("svg",{width:e.width,height:e.height},r.a.createElement(pe,Object.assign({xScale:t,yScale:a},this.props)),r.a.createElement(ue,Object.assign({xScale:t,yScale:a},this.props)))}}]),t}(r.a.Component),he=function(e){function t(){var e,a;Object(c.a)(this,t);for(var n=arguments.length,r=new Array(n),i=0;i<n;i++)r[i]=arguments[i];return(a=Object(l.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(r)))).state={mode:se[1],data:[]},a.toggleMode=function(){var e=a.state.mode;e===se[0]?a.setState({mode:se[1]}):e===se[1]&&a.setState({mode:se[0]})},a.processData=function(){var e=a.props.data.map(function(e,t,a){return 0!==t?{year:e[0],xLast:a[t-1][1],xDiff:e[1]-a[t-1][1],xAbs:e[1]}:null}).filter(function(e){return!!e});a.setState({data:e})},a}return Object(p.a)(t,e),Object(s.a)(t,[{key:"componentWillMount",value:function(){this.processData()}},{key:"componentDidUpdate",value:function(e){e.data!==this.props.data&&this.processData()}},{key:"render",value:function(){var e=this.props,t=e.settings,a=e.country,n=e.group;return r.a.createElement(d.a,{size:"small",bodyStyle:{width:324,height:424},title:"".concat(a," - ").concat(q[n]),extra:r.a.createElement("div",{className:"vizMenuExtra"},r.a.createElement(h.a,{type:"swap",theme:"outlined",onClick:this.toggleMode}),r.a.createElement(h.a,{type:"setting",theme:"filled",onClick:this.props.toggleView}),r.a.createElement(h.a,{type:"close",theme:"outlined",onClick:this.props.handleClose}))},r.a.createElement(de,{data:this.state.data,settings:Object(P.a)({},t,{numDataPoints:this.state.data.length+1,mode:this.state.mode})}))}}]),t}(n.Component);he.defaultProps={settings:{width:300,height:400,padding:40,baseYear:1985,numDataPoints:30,maxRange:function(){return 100*Math.random()}}};var fe=he,me=(a(97),a(94));a(278);function ge(){var e=Object(g.a)(["\n      {\n        names(type: MACRO)\n      }\n    "]);return ge=function(){return e},e}var ye=S(C(function(e){function t(){return Object(c.a)(this,t),Object(l.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(p.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){var e=this,t=this.props.interaction.fields.availableCountries,a=this.props,n=a.country,i=a.group,o=O()(ge()),c=function(t){return function(a){e.props.handleChange(Object(Y.a)({},t,a))}};return r.a.createElement(j.b,{query:o},function(a){var o=a.loading,s=a.error,l=a.data;return s&&console.log("Error loading gql data for WaterfallConfig"),r.a.createElement(d.a,{size:"small",bodyStyle:{width:324,height:424},title:"Waterfall Config",extra:r.a.createElement(h.a,{type:"close",theme:"outlined",onClick:e.props.handleClose})},o||e.props.data.loading?"Loading...":r.a.createElement("div",{className:"WaterfallConfig"},r.a.createElement(L,{placeholder:"Select a country",options:t,handleChange:c("country"),value:n||void 0}),r.a.createElement(L,{placeholder:"Select a group",options:l.names.map(function(e){return{value:e,display:q[e]}}),handleChange:c("group"),value:i||void 0}),r.a.createElement(me.a,{type:"primary",onClick:e.props.toggleView},"Visualize")))})}}]),t}(n.Component))),be=C(function(e){function t(){var e,a;Object(c.a)(this,t);for(var n=arguments.length,r=new Array(n),i=0;i<n;i++)r[i]=arguments[i];return(a=Object(l.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(r)))).state={displayConfig:!0,country:null,group:null,data:[]},a.toggleView=function(){a.setState(function(e){return{displayConfig:!e.displayConfig}})},a.handleChange=function(){var e=Object(ce.a)(oe.a.mark(function e(t){return oe.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,a.setState(Object(P.a)({},t));case 2:a.filterData();case 3:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}(),a.filterData=function(){var e=a.state,t=e.country,n=e.group,r=[];t&&n&&(r=a.props.data.data.map(function(e){return[e.year,e.countries.filter(function(e){return e.country===t})[0].items.filter(function(e){return e.name===n})[0].value]})),a.setState({data:r})},a}return Object(p.a)(t,e),Object(s.a)(t,[{key:"componentDidUpdate",value:function(e){e.data.data!==this.props.data.data&&this.filterData()}},{key:"render",value:function(){var e=this.state,t=e.data,a=Object(re.a)(e,["data"]);return r.a.createElement("div",null,this.state.displayConfig?r.a.createElement(ye,Object.assign({handleChange:this.handleChange,toggleView:this.toggleView,handleClose:this.props.handleClose},a)):r.a.createElement(fe,Object.assign({},this.props,a,{toggleView:this.toggleView,handleClose:this.props.handleClose,data:t})))}}]),t}(n.Component));function ve(){var e=Object(g.a)(["\n      {\n        yearRange {\n          min\n          max\n        }\n      }\n    "]);return ve=function(){return e},e}var Oe=b.a.Text,je=function(e){function t(e){var a;Object(c.a)(this,t),(a=Object(l.a)(this,Object(u.a)(t).call(this,e))).handleChange=function(e){a.setState({value:e})},a.handleRelease=function(e){var t=Object(f.a)(Array(e[1]-e[0]+1).keys()).map(function(t){return e[0]+t});a.props.data.setQuery({years:t}),a.props.interaction.setFields({availableYears:t})};var n=a.props,r=n.min,i=n.max;return a.handleRelease([r,i]),a.state={value:[r,i]},a}return Object(p.a)(t,e),Object(s.a)(t,[{key:"componentDidUpdate",value:function(e){var t=this.props.interaction.fields.availableYears;e.interaction.fields.availableYears!==t&&this.setState({value:[t[0],t[t.length-1]]})}},{key:"render",value:function(){var e,t=this.props,a=t.min,n=t.max;return r.a.createElement("div",null,r.a.createElement(Oe,null,"Year"),r.a.createElement(J.a,{range:!0,min:a,max:n,marks:(e={},Object(Y.a)(e,a,a),Object(Y.a)(e,n,n),e),onChange:this.handleChange,onAfterChange:this.handleRelease,value:this.state.value}))}}]),t}(n.Component),xe=S(C(function(e){function t(){return Object(c.a)(this,t),Object(l.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(p.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){var e=this,t=O()(ve());return r.a.createElement(j.b,{query:t},function(t){var a=t.loading,n=t.error,i=t.data;if(a)return"Loading...";n&&console.log("Error loading gql data for YearRangeSliderContainer");var o=i.yearRange,c=o.min,s=o.max;return r.a.createElement(je,Object.assign({},e.props,{min:c,max:s}))})}}]),t}(n.Component))),Ce=S(C(function(e){function t(){var e,a;Object(c.a)(this,t);for(var n=arguments.length,r=new Array(n),i=0;i<n;i++)r[i]=arguments[i];return(a=Object(l.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(r)))).handleClick=function(){var e=a.props,t=e.yearRange,n=e.countries,r=e.selectedYear,i=e.selectedCountry,o={},c={};if(t){var s=Object(f.a)(Array(t[1]-t[0]+1).keys()).map(function(e){return t[0]+e});o.years=s,c.availableYears=s}n&&(o.countries=n,c.availableCountries=n),r&&(c.selectedYear=r),i&&(c.selectedCountry=i),0!==Object.keys(o).length&&a.props.data.setQuery(o),0!==Object.keys(c).length&&a.props.interaction.setFields(c)},a}return Object(p.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){return r.a.createElement(me.a,{onClick:this.handleClick},this.props.children)}}]),t}(n.Component))),Ee=(a(279),m.a.Sider),Se=m.a.Content,ke=function(e){function t(){var e,a;Object(c.a)(this,t);for(var n=arguments.length,r=new Array(n),i=0;i<n;i++)r[i]=arguments[i];return(a=Object(l.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(r)))).state={waterfalls:[],waterfallCount:0},a.handleCloseWaterfall=function(e){return function(){a.setState(function(t){return{waterfalls:t.waterfalls.filter(function(t){return+t.key!==e})}})}},a}return Object(p.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){var e=this;return r.a.createElement(m.a,{style:{height:"100vh"}},r.a.createElement(Ee,{theme:"light",className:"sideBar"},r.a.createElement("h1",{className:"App-title"},"Nutrition InfoViz"),r.a.createElement(A,null),r.a.createElement(xe,null),r.a.createElement(Ce,{countries:["Canada","Afghanistan","Mexico"],yearRange:[1990,2e3]},"Preset 1")),r.a.createElement(Se,{className:"dashboard"},r.a.createElement(ne,null),r.a.createElement(I,null),this.state.waterfalls,r.a.createElement(d.a,{size:"small",hoverable:!0,bodyStyle:{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"space-around",width:"200px",height:"120px"},onClick:function(){return e.setState(function(t){return{waterfalls:[].concat(Object(f.a)(t.waterfalls),[r.a.createElement(be,{key:t.waterfallCount,handleClose:e.handleCloseWaterfall(t.waterfallCount)})]),waterfallCount:t.waterfallCount+1}})}},"Waterfall",r.a.createElement("br",null),r.a.createElement(h.a,{type:"plus",theme:"outlined",style:{fontSize:30}}))))}}]),t}(n.Component),we=a(155);function De(){var e=Object(g.a)(["\n          {\n            alls(\n              ","\n              ","\n              ","\n            )\n              {\n              year\n              countries {\n                country\n                items {\n                  country\n                  year\n                  type\n                  name\n                  value\n                  lifeExp\n                }\n              }\n            }\n          }\n        "]);return De=function(){return e},e}var Ae=function(e){function t(){var e;return Object(c.a)(this,t),(e=Object(l.a)(this,Object(u.a)(t).call(this))).setQuery=function(){var t=Object(ce.a)(oe.a.mark(function t(a){return oe.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.setState(function(e){return{queryParams:Object(P.a)({},e.queryParams,a)}});case 2:e.getData();case 3:case"end":return t.stop()}},t)}));return function(e){return t.apply(this,arguments)}}(),e.setData=function(t){e.setState(function(e){return{data:t,loading:e.loading-1}})},e.getData=function(){var t=e.state.queryParams,a=t.years,n=t.countries,r=t.type;if(e.setState(function(e){return{loading:e.loading+1}}),0===a.length||0===n.length)return e.setData([]);e.client.query({query:O()(De(),a.length>0?"years:".concat(JSON.stringify(a),", "):"",n.length>0?"countries:".concat(JSON.stringify(n),", "):"",r?"type:".concat(r):"")}).then(function(t){return e.setData(t.data.alls||[])}).catch(function(e){return console.log(e)})},e.state={setDate:e.setData,setQuery:e.setQuery,data:[],queryParams:{type:"MACRO",countries:[],years:[]},loading:0},e.client=new we.a({uri:"http://localhost:4000/graphql"}),e}return Object(p.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){return n.createElement(x.Provider,{value:this.state},n.createElement(j.a,{client:this.client},this.props.children))}}]),t}(n.Component),Ye=function(e){function t(){var e;return Object(c.a)(this,t),(e=Object(l.a)(this,Object(u.a)(t).call(this))).setFields=function(t){e.setState(function(e){return{fields:Object(P.a)({},e.fields,t)}})},e.state={setFields:e.setFields,fields:{availableYears:[],availableCountries:[],selectedYear:null,selectedCountry:null,hoveredYear:null,hoveredCountry:null}},e}return Object(p.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){return n.createElement(E.Provider,{value:this.state},this.props.children)}}]),t}(n.Component),Pe=function(e){function t(){return Object(c.a)(this,t),Object(l.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(p.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){return r.a.createElement(Ae,null,r.a.createElement(Ye,null,r.a.createElement("div",{className:"App"},r.a.createElement(ke,null))))}}]),t}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(r.a.createElement(Pe,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[160,1,2]]]);
//# sourceMappingURL=main.6aa17022.chunk.js.map