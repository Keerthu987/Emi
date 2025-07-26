import { useEffect, useState } from 'react'
import { tenureData } from "./utils/constants";
import { numberWithCommas } from "./utils/config";
import TextInput from "./Components/text-input";
import SliderInput from "./Components/slider-input";

import './App.css'

function App() {
  const [cost,setCost]=useState(0)
  const [interest,setInterest]=useState(10)
  const [fee,setFee]=useState(1)
   const [downPayment, setDownPayment] = useState(0);
  const [tenure, setTenure] = useState(12);
  const [emi, setEmi] = useState(0);

  const calcEMI= (downPayment)=>{
    // EMI amount = [P x R x (1+R)^N]/[(1+R)^N-1]
    if(!cost) return;

    const loanAmt= cost-downPayment
    const r= interest/100
   const noOfYears=tenure/12 
   
   const EMI= (loanAmt*r*(1+r)**noOfYears)/((1+r)**noOfYears-1)

   return Number(EMI/12).toFixed(0)
  }

  const calculateDP=(emi)=>{
    if(!cost) return

    const dp=100- (emi/calcEMI(0))*100
   return Number((dp/100)*cost).toFixed(0)
  
  }

  useEffect(()=>{
    if(!(cost>0)){
      setDownPayment(0)
      setEmi(0)
    }

    const emi=calcEMI(downPayment)
    setEmi(emi)
  },[tenure,cost])


  const updateEMI=(e)=>{
    if(!cost) return;
    const  dp=Number(e.target.value)
    setDownPayment(dp.toFixed(0))
    const emi=calcEMI(dp)
    setEmi(emi)
  }

  const updateDp=(e)=>{
    if(!cost) return
    const emi=Number(e.target.value)
     setEmi(emi.toFixed(0))

     const dp=calculateDP(emi)
     setDownPayment(dp)  
  }

  const totalDp=()=>{
    return numberWithCommas((Number(downPayment)+(cost-downPayment)*(fee/100)).toFixed(0))
  }

  const totalEMI= ()=>{
    return numberWithCommas((emi*tenure).toFixed(0))
  }
  return (
    <div className='App'>
      <span className='title' style={{fontSize:30,marginTop:10}}>EMI Calculator</span>
    <TextInput
        title={"Total Cost of Asset"}
        state={cost}
        setState={setCost}
      />

      <TextInput
        title={"Interest Rate (in %)"}
        state={interest}
        setState={setInterest}
      />

      <TextInput
        title={"Processing Fee (in %)"}
        state={fee}
        setState={setFee}
      />

        <SliderInput
        title="Down Payment"
        underlineTitle={`Total Down Payment - ${totalDp()}`}
        onChange={updateEMI}
        state={downPayment}
        min={0}
        max={cost}
        labelMin={"0%"}
        labelMax={"100%"}
      />

      <SliderInput
        title="Loan per Month"
        underlineTitle={`Total Loan Amount - ${totalEMI()}`}
        onChange={updateDp}
        state={emi}
        min={calcEMI(cost)}
        max={calcEMI(0)}
      />
     <span className="title">Tenure</span>
 <div className="tenureContainer">
        {tenureData.map((t) => {
          return (
            <button 
            key={t}
              className={`tenure ${t === tenure ? "selected" : ""}`}
              onClick={() => setTenure(t)}
            >
              {t}
            </button>
          );
        })}
      </div>

    </div>
  )
}

export default App
