const calculators = [
  {
    id: "compound-interest", name: "Compound Interest", category: "Finance", icon: "↗", accent: "#61f6ff",
    description: "Project investment growth with recurring compounding.", formula: "A = P(1 + r/n)^(nt)",
    fields: [
      { key:"p", label:"Principal", type:"number", value:10000, min:0, step:"any" },
      { key:"r", label:"Annual rate (%)", type:"number", value:7, step:"any" },
      { key:"n", label:"Compounds per year", type:"select", value:12, options:[[1,"Annually"],[4,"Quarterly"],[12,"Monthly"],[365,"Daily"]] },
      { key:"t", label:"Years", type:"number", value:10, min:0, step:"any" }
    ],
    calculate: v => {
      const amount = v.p * Math.pow(1 + (v.r / 100) / v.n, v.n * v.t);
      return { value: money(amount), extra:`Interest earned: ${money(amount-v.p)}` };
    }
  },
  {
    id:"mortgage", name:"Mortgage Payment", category:"Finance", icon:"⌂", accent:"#8c68ff",
    description:"Estimate a fixed-rate monthly principal and interest payment.", formula:"M = P[r(1+r)^n]/[(1+r)^n−1]",
    fields:[
      {key:"p",label:"Loan amount",type:"number",value:400000,min:0},
      {key:"rate",label:"Annual rate (%)",type:"number",value:6.5,step:"any"},
      {key:"years",label:"Loan term (years)",type:"number",value:30,min:1},
      {key:"down",label:"Down payment",type:"number",value:0,min:0}
    ],
    calculate:v=>{
      const principal=Math.max(0,v.p-v.down), r=(v.rate/100)/12, n=v.years*12;
      const payment=r===0?principal/n:principal*(r*Math.pow(1+r,n))/(Math.pow(1+r,n)-1);
      return {value:money(payment)+"/mo",extra:`Financed amount: ${money(principal)} · Total payments: ${money(payment*n)}`};
    }
  },
  {
    id:"profit-margin", name:"Profit Margin", category:"Business", icon:"%", accent:"#63ffbd",
    description:"Measure profit as a percentage of revenue.", formula:"Margin = (Revenue − Cost) / Revenue × 100",
    fields:[
      {key:"revenue",label:"Revenue",type:"number",value:100000},
      {key:"cost",label:"Total cost",type:"number",value:65000}
    ],
    calculate:v=>{
      if(v.revenue===0) throw new Error("Revenue must be greater than zero.");
      const profit=v.revenue-v.cost, margin=profit/v.revenue*100;
      return {value:formatNumber(margin,2)+"%",extra:`Gross profit: ${money(profit)}`};
    }
  },
  {
    id:"percentage-change", name:"Percentage Change", category:"Math", icon:"Δ", accent:"#ff7ad9",
    description:"Compare the relative increase or decrease between two values.", formula:"Δ% = (New − Old) / |Old| × 100",
    fields:[
      {key:"old",label:"Original value",type:"number",value:80},
      {key:"new",label:"New value",type:"number",value:100}
    ],
    calculate:v=>{
      if(v.old===0) throw new Error("Original value cannot be zero.");
      const change=(v.new-v.old)/Math.abs(v.old)*100;
      return {value:`${change>=0?"+":""}${formatNumber(change,2)}%`,extra:`Absolute change: ${formatNumber(v.new-v.old,4)}`};
    }
  },
  {
    id:"quadratic", name:"Quadratic Formula", category:"Math", icon:"x²", accent:"#61f6ff",
    description:"Solve ax² + bx + c = 0 for real or complex roots.", formula:"x = (−b ± √(b²−4ac)) / 2a",
    fields:[
      {key:"a",label:"a",type:"number",value:1},
      {key:"b",label:"b",type:"number",value:-3},
      {key:"c",label:"c",type:"number",value:2}
    ],
    calculate:v=>{
      if(v.a===0) throw new Error("Coefficient a cannot be zero.");
      const d=v.b*v.b-4*v.a*v.c;
      if(d>=0){
        const x1=(-v.b+Math.sqrt(d))/(2*v.a),x2=(-v.b-Math.sqrt(d))/(2*v.a);
        return {value:`x = ${formatNumber(x1,5)}, ${formatNumber(x2,5)}`,extra:`Discriminant: ${formatNumber(d,5)}`};
      }
      const real=-v.b/(2*v.a),imag=Math.sqrt(-d)/(2*Math.abs(v.a));
      return {value:`${formatNumber(real,4)} ± ${formatNumber(imag,4)}i`,extra:`Discriminant: ${formatNumber(d,5)}`};
    }
  },
  {
    id:"circle", name:"Circle Geometry", category:"Math", icon:"○", accent:"#8c68ff",
    description:"Find the area and circumference of a circle.", formula:"A = πr² · C = 2πr",
    fields:[{key:"r",label:"Radius",type:"number",value:5,min:0,step:"any"}],
    calculate:v=>({value:`Area: ${formatNumber(Math.PI*v.r*v.r,4)}`,extra:`Circumference: ${formatNumber(2*Math.PI*v.r,4)}`})
  },
  {
    id:"kinetic-energy", name:"Kinetic Energy", category:"Physics", icon:"⚡", accent:"#ffd766",
    description:"Calculate the energy of an object in motion.", formula:"KE = ½mv²",
    fields:[
      {key:"m",label:"Mass (kg)",type:"number",value:10,min:0,step:"any"},
      {key:"v",label:"Velocity (m/s)",type:"number",value:20,step:"any"}
    ],
    calculate:v=>({value:`${formatNumber(.5*v.m*v.v,4)} J`,extra:"Result in joules (kg·m²/s²)."})
  },
  {
    id:"ohms-law", name:"Ohm’s Law", category:"Engineering", icon:"Ω", accent:"#ff8a66",
    description:"Calculate voltage from current and resistance.", formula:"V = I × R",
    fields:[
      {key:"i",label:"Current (amps)",type:"number",value:2,step:"any"},
      {key:"r",label:"Resistance (ohms)",type:"number",value:12,step:"any"}
    ],
    calculate:v=>({value:`${formatNumber(v.i*v.r,5)} V`,extra:`Power: ${formatNumber(v.i*v.i*v.r,5)} W`})
  },
  {
    id:"density", name:"Density", category:"Science", icon:"ρ", accent:"#63ffbd",
    description:"Calculate mass per unit volume.", formula:"ρ = m / V",
    fields:[
      {key:"m",label:"Mass",type:"number",value:100,step:"any"},
      {key:"vol",label:"Volume",type:"number",value:20,step:"any"}
    ],
    calculate:v=>{
      if(v.vol===0) throw new Error("Volume must be greater than zero.");
      return {value:formatNumber(v.m/v.vol,6),extra:"Result uses the units supplied for mass and volume."};
    }
  },
  {
    id:"bmi", name:"Body Mass Index", category:"Health", icon:"♡", accent:"#ff7595",
    description:"Estimate BMI using metric height and weight.", formula:"BMI = weight(kg) / height(m)²",
    fields:[
      {key:"weight",label:"Weight (kg)",type:"number",value:75,min:1,step:"any"},
      {key:"height",label:"Height (cm)",type:"number",value:178,min:1,step:"any"}
    ],
    calculate:v=>{
      const bmi=v.weight/Math.pow(v.height/100,2);
      const band=bmi<18.5?"Underweight":bmi<25?"Healthy range":bmi<30?"Overweight":"Obesity range";
      return {value:formatNumber(bmi,1),extra:`General screening category: ${band}. BMI is not a diagnosis.`};
    }
  },
  {
    id:"temperature", name:"Temperature Converter", category:"Conversions", icon:"°", accent:"#61f6ff",
    description:"Convert between Celsius, Fahrenheit and Kelvin.", formula:"°F = °C × 9/5 + 32",
    fields:[
      {key:"value",label:"Temperature",type:"number",value:20,step:"any"},
      {key:"from",label:"Convert from",type:"select",value:"C",options:[["C","Celsius"],["F","Fahrenheit"],["K","Kelvin"]]}
    ],
    calculate:v=>{
      const c=v.from==="C"?v.value:v.from==="F"?(v.value-32)*5/9:v.value-273.15;
      return {value:`${formatNumber(c,2)} °C`,extra:`${formatNumber(c*9/5+32,2)} °F · ${formatNumber(c+273.15,2)} K`};
    }
  },
  {
    id:"data-storage", name:"Data Storage", category:"Computing", icon:"01", accent:"#8c68ff",
    description:"Convert decimal bytes into common storage units.", formula:"1 GB = 1,000,000,000 bytes",
    fields:[
      {key:"value",label:"Value",type:"number",value:1000,min:0,step:"any"},
      {key:"unit",label:"Input unit",type:"select",value:"MB",options:[["B","Bytes"],["KB","KB"],["MB","MB"],["GB","GB"],["TB","TB"]]}
    ],
    calculate:v=>{
      const factors={B:1,KB:1e3,MB:1e6,GB:1e9,TB:1e12},b=v.value*factors[v.unit];
      return {value:`${formatNumber(b/1e9,6)} GB`,extra:`${formatNumber(b/1e6,6)} MB · ${formatNumber(b,0)} bytes`};
    }
  }
];

const categories = ["All","Math","Finance","Business","Physics","Science","Engineering","Health","Computing","Conversions"];
const grid=document.getElementById("calculatorGrid");
const categoryList=document.getElementById("categoryList");
const modal=document.getElementById("calculatorModal");
const modalContent=document.getElementById("modalContent");
const search=document.getElementById("globalSearch");
const suggestions=document.getElementById("searchSuggestions");
let activeCategory="All";

function formatNumber(n,digits=2){
  if(!Number.isFinite(n)) return "Undefined";
  return new Intl.NumberFormat("en-US",{maximumFractionDigits:digits}).format(n);
}
function money(n){ return new Intl.NumberFormat("en-US",{style:"currency",currency:"USD",maximumFractionDigits:2}).format(n); }

function renderCategories(){
  categoryList.innerHTML=categories.map(c=>{
    const count=c==="All"?calculators.length:calculators.filter(x=>x.category===c).length;
    return `<button class="${c===activeCategory?"active":""}" data-category="${c}"><span>${c}</span><small>${String(count).padStart(2,"0")}</small></button>`;
  }).join("");
  categoryList.querySelectorAll("button").forEach(btn=>btn.addEventListener("click",()=>{
    activeCategory=btn.dataset.category;
    document.getElementById("sectionTitle").textContent=activeCategory==="All"?"All calculators":activeCategory;
    renderCategories(); renderGrid();
  }));
}
function renderGrid(term=""){
  const q=term.trim().toLowerCase();
  const items=calculators.filter(c=>(activeCategory==="All"||c.category===activeCategory)&&(!q||`${c.name} ${c.category} ${c.description} ${c.formula}`.toLowerCase().includes(q)));
  grid.innerHTML=items.length?items.map(c=>`
    <article class="calc-card" style="--accent:${c.accent}" data-id="${c.id}" tabindex="0">
      <div class="card-top"><span class="card-icon">${c.icon}</span><span class="card-category">${c.category.toUpperCase()}</span></div>
      <h3>${c.name}</h3><p>${c.description}</p><div class="card-formula">${c.formula}</div>
    </article>`).join(""):`<p class="error">No calculators match that search.</p>`;
  grid.querySelectorAll(".calc-card").forEach(card=>{
    const open=()=>openCalculator(card.dataset.id);
    card.addEventListener("click",open); card.addEventListener("keydown",e=>{if(e.key==="Enter")open()});
  });
}
function fieldHtml(f){
  if(f.type==="select") return `<div class="field"><label for="${f.key}">${f.label}</label><select id="${f.key}" data-field>${f.options.map(([value,label])=>`<option value="${value}" ${String(value)===String(f.value)?"selected":""}>${label}</option>`).join("")}</select></div>`;
  return `<div class="field"><label for="${f.key}">${f.label}</label><input id="${f.key}" data-field type="number" value="${f.value}" ${f.min!==undefined?`min="${f.min}"`:""} step="${f.step||"any"}"></div>`;
}
function openCalculator(id){
  const c=calculators.find(x=>x.id===id); if(!c)return;
  modalContent.innerHTML=`
    <div class="modal-kicker">${c.category.toUpperCase()} / CALCULATOR</div>
    <h2>${c.name}</h2><p class="modal-description">${c.description}</p>
    <div class="calc-form">${c.fields.map(fieldHtml).join("")}</div>
    <div class="result-panel">
      <div class="result-label">COMPUTED RESULT</div>
      <div class="result-value" id="resultValue">—</div>
      <div class="result-extra" id="resultExtra"></div>
      <div class="formula-box">${c.formula}</div>
    </div>`;
  const update=()=>{
    const values={};
    c.fields.forEach(f=>{
      const el=document.getElementById(f.key);
      values[f.key]=f.type==="select"&&typeof f.value==="string"?el.value:Number(el.value);
    });
    try{
      const result=c.calculate(values);
      document.getElementById("resultValue").textContent=result.value;
      document.getElementById("resultValue").classList.remove("error");
      document.getElementById("resultExtra").textContent=result.extra||"";
    }catch(err){
      document.getElementById("resultValue").textContent="Check inputs";
      document.getElementById("resultValue").classList.add("error");
      document.getElementById("resultExtra").textContent=err.message;
    }
  };
  modalContent.querySelectorAll("[data-field]").forEach(el=>el.addEventListener("input",update));
  update(); modal.showModal();
}
document.getElementById("closeModal").addEventListener("click",()=>modal.close());
modal.addEventListener("click",e=>{if(e.target===modal)modal.close()});
document.addEventListener("keydown",e=>{
  if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==="k"){e.preventDefault();search.focus();}
  if(e.key==="Escape"&&modal.open)modal.close();
});
search.addEventListener("input",()=>{
  const q=search.value.trim().toLowerCase();
  renderGrid(q);
  const matches=q?calculators.filter(c=>`${c.name} ${c.category} ${c.description}`.toLowerCase().includes(q)).slice(0,5):[];
  suggestions.innerHTML=matches.map(c=>`<button data-id="${c.id}"><strong>${c.name}</strong> · ${c.category}</button>`).join("");
  suggestions.classList.toggle("hidden",!matches.length);
  suggestions.querySelectorAll("button").forEach(b=>b.addEventListener("click",()=>{suggestions.classList.add("hidden");openCalculator(b.dataset.id)}));
});
document.getElementById("themeButton").addEventListener("click",()=>document.body.classList.toggle("high-contrast"));
document.getElementById("calculatorCount").textContent=calculators.length;
document.getElementById("year").textContent=new Date().getFullYear();

function initStarfield(){
  const canvas=document.getElementById("starfield"),ctx=canvas.getContext("2d");
  let stars=[];
  const resize=()=>{
    const dpr=Math.min(devicePixelRatio||1,2); canvas.width=innerWidth*dpr;canvas.height=innerHeight*dpr;
    canvas.style.width=innerWidth+"px";canvas.style.height=innerHeight+"px";ctx.setTransform(dpr,0,0,dpr,0,0);
    stars=Array.from({length:Math.min(140,Math.floor(innerWidth/8))},()=>({x:Math.random()*innerWidth,y:Math.random()*innerHeight,r:Math.random()*1.2+.2,a:Math.random()*.6+.15}));
  };
  const draw=()=>{ctx.clearRect(0,0,innerWidth,innerHeight);for(const s of stars){ctx.beginPath();ctx.arc(s.x,s.y,s.r,0,Math.PI*2);ctx.fillStyle=`rgba(170,195,255,${s.a})`;ctx.fill();}requestAnimationFrame(draw)};
  addEventListener("resize",resize);resize();draw();
}
renderCategories();renderGrid();initStarfield();

const gridViewBtn = document.getElementById("gridViewBtn");
const listViewBtn = document.getElementById("listViewBtn");

gridViewBtn.addEventListener("click", () => {
    grid.classList.remove("list-view");

    gridViewBtn.classList.add("active");
    listViewBtn.classList.remove("active");
});

listViewBtn.addEventListener("click", () => {
    grid.classList.add("list-view");

    listViewBtn.classList.add("active");
    gridViewBtn.classList.remove("active");
});
