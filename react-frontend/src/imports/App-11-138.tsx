function PrimitiveButton() {
  return (
    <div className="col-end-auto col-start-1 h-[29px] relative rounded-[14px] row-end-auto row-start-1 shrink-0" data-name="Primitive.button">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="box-border content-stretch flex gap-[6px] h-[29px] items-center justify-center px-[9px] py-[5px] relative w-full">
          <p className="font-['Inter:Medium',_sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[14px] text-neutral-950 text-nowrap tracking-[-0.1504px] whitespace-pre">Login</p>
        </div>
      </div>
    </div>
  );
}

function PrimitiveButton1() {
  return (
    <div className="bg-white col-end-auto col-start-2 h-[29px] relative rounded-[14px] row-end-auto row-start-1 shrink-0" data-name="Primitive.button">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="box-border content-stretch flex gap-[6px] h-[29px] items-center justify-center px-[9px] py-[5px] relative w-full">
          <p className="font-['Inter:Medium',_sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[14px] text-neutral-950 text-nowrap tracking-[-0.1504px] whitespace-pre">Create Account</p>
        </div>
      </div>
    </div>
  );
}

function TabList() {
  return (
    <div className="bg-[#ececf0] h-[36px] relative rounded-[14px] shrink-0 w-[608px]" data-name="Tab List">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border grid grid-cols-[repeat(2,_minmax(0px,_1fr))] grid-rows-[repeat(1,_minmax(0px,_1fr))] h-[36px] px-[3px] py-[3.5px] relative w-[608px]">
        <PrimitiveButton />
        <PrimitiveButton1 />
      </div>
    </div>
  );
}

function Heading2() {
  return (
    <div className="h-[30px] relative shrink-0 w-full" data-name="Heading 2">
      <p className="absolute font-['Inter:Medium',_sans-serif] font-medium leading-[30px] left-[312px] not-italic text-[20px] text-center text-neutral-950 top-[-23px] tracking-[-0.4492px] translate-x-[-50%] w-[176px]">Enter your details</p>
    </div>
  );
}

function Paragraph() {
  return (
    <div className="h-px relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[24px] left-[303.9px] not-italic text-[#717182] text-[16px] text-center text-nowrap top-[-28px] tracking-[-0.3125px] translate-x-[-50%] whitespace-pre">{`We don't use your details for marketing purposes`}</p>
    </div>
  );
}

function App() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] h-[62px] items-start relative shrink-0 w-full" data-name="App">
      <Heading2 />
      <Paragraph />
    </div>
  );
}

function App1() {
  return (
    <div className="absolute h-[14px] left-[79.34px] top-0 w-[6.516px]" data-name="App">
      <p className="absolute font-['Inter:Medium',_sans-serif] font-medium leading-[14px] left-0 not-italic text-[#fb2c36] text-[14px] text-nowrap top-0 tracking-[-0.1504px] whitespace-pre">*</p>
    </div>
  );
}

function PrimitiveLabel() {
  return (
    <div className="h-[14px] relative shrink-0 w-full" data-name="Primitive.label">
      <p className="absolute font-['Inter:Medium',_sans-serif] font-medium leading-[14px] left-0 not-italic text-[14px] text-neutral-950 text-nowrap top-0 tracking-[-0.1504px] whitespace-pre">First Name</p>
      <App1 />
    </div>
  );
}

function Input() {
  return (
    <div className="bg-white h-[36px] relative rounded-[8px] shrink-0 w-full" data-name="Input">
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex h-[36px] items-center px-[12px] py-[4px] relative w-full">
          <p className="font-['Inter:Regular',_sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[14px] text-neutral-950 text-nowrap tracking-[-0.1504px] whitespace-pre">First Name</p>
        </div>
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] h-[58px] items-start relative shrink-0 w-full" data-name="Container">
      <PrimitiveLabel />
      <Input />
    </div>
  );
}

function App2() {
  return (
    <div className="absolute h-[14px] left-[78.27px] top-0 w-[6.516px]" data-name="App">
      <p className="absolute font-['Inter:Medium',_sans-serif] font-medium leading-[14px] left-0 not-italic text-[#fb2c36] text-[14px] text-nowrap top-0 tracking-[-0.1504px] whitespace-pre">*</p>
    </div>
  );
}

function PrimitiveLabel1() {
  return (
    <div className="h-[14px] relative shrink-0 w-full" data-name="Primitive.label">
      <p className="absolute font-['Inter:Medium',_sans-serif] font-medium leading-[14px] left-0 not-italic text-[14px] text-neutral-950 text-nowrap top-0 tracking-[-0.1504px] whitespace-pre">Last Name</p>
      <App2 />
    </div>
  );
}

function Input1() {
  return (
    <div className="bg-white h-[36px] relative rounded-[8px] shrink-0 w-full" data-name="Input">
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex h-[36px] items-center px-[12px] py-[4px] relative w-full">
          <p className="font-['Inter:Regular',_sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[14px] text-neutral-950 text-nowrap tracking-[-0.1504px] whitespace-pre">Last Name</p>
        </div>
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] h-[58px] items-start relative shrink-0 w-full" data-name="Container">
      <PrimitiveLabel1 />
      <Input1 />
    </div>
  );
}

function App3() {
  return (
    <div className="absolute h-[14px] left-[101.39px] top-0 w-[6.516px]" data-name="App">
      <p className="absolute font-['Inter:Medium',_sans-serif] font-medium leading-[14px] left-0 not-italic text-[#fb2c36] text-[14px] text-nowrap top-0 tracking-[-0.1504px] whitespace-pre">*</p>
    </div>
  );
}

function PrimitiveLabel2() {
  return (
    <div className="h-[14px] relative shrink-0 w-full" data-name="Primitive.label">
      <p className="absolute font-['Inter:Medium',_sans-serif] font-medium leading-[14px] left-0 not-italic text-[14px] text-neutral-950 text-nowrap top-0 tracking-[-0.1504px] whitespace-pre">Email Address</p>
      <App3 />
    </div>
  );
}

function Input2() {
  return (
    <div className="bg-white h-[36px] relative rounded-[8px] shrink-0 w-full" data-name="Input">
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex h-[36px] items-center px-[12px] py-[4px] relative w-full">
          <p className="font-['Inter:Regular',_sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[14px] text-neutral-950 text-nowrap tracking-[-0.1504px] whitespace-pre">Enter your email address</p>
        </div>
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] h-[58px] items-start relative shrink-0 w-full" data-name="Container">
      <PrimitiveLabel2 />
      <Input2 />
    </div>
  );
}

function App4() {
  return (
    <div className="absolute h-[14px] left-[61.09px] top-0 w-[6.516px]" data-name="App">
      <p className="absolute font-['Inter:Medium',_sans-serif] font-medium leading-[14px] left-0 not-italic text-[#fb2c36] text-[14px] text-nowrap top-0 tracking-[-0.1504px] whitespace-pre">*</p>
    </div>
  );
}

function PrimitiveLabel3() {
  return (
    <div className="h-[14px] relative shrink-0 w-full" data-name="Primitive.label">
      <p className="absolute font-['Inter:Medium',_sans-serif] font-medium leading-[14px] left-0 not-italic text-[14px] text-neutral-950 text-nowrap top-0 tracking-[-0.1504px] whitespace-pre">Country</p>
      <App4 />
    </div>
  );
}

function PrimitiveSpan() {
  return (
    <div className="h-[20px] relative shrink-0 w-[51.672px]" data-name="Primitive.span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[8px] h-[20px] items-center overflow-clip relative rounded-[inherit] w-[51.672px]">
        <p className="font-['Inter:Regular',_sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#717182] text-[14px] text-nowrap tracking-[-0.1504px] whitespace-pre">Country</p>
      </div>
    </div>
  );
}

function Icon() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon" opacity="0.5">
          <path d="M4 6L8 10L12 6" id="Vector" stroke="var(--stroke-0, #717182)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function PrimitiveButton2() {
  return (
    <div className="bg-white h-[36px] relative rounded-[8px] shrink-0 w-full" data-name="Primitive.button">
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex h-[36px] items-center justify-between px-[13px] py-px relative w-full">
          <PrimitiveSpan />
          <Icon />
        </div>
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] h-[58px] items-start relative shrink-0 w-full" data-name="Container">
      <PrimitiveLabel3 />
      <PrimitiveButton2 />
    </div>
  );
}

function App5() {
  return (
    <div className="absolute h-[14px] left-[71.69px] top-0 w-[6.516px]" data-name="App">
      <p className="absolute font-['Inter:Medium',_sans-serif] font-medium leading-[14px] left-0 not-italic text-[#fb2c36] text-[14px] text-nowrap top-0 tracking-[-0.1504px] whitespace-pre">*</p>
    </div>
  );
}

function PrimitiveLabel4() {
  return (
    <div className="h-[14px] relative shrink-0 w-full" data-name="Primitive.label">
      <p className="absolute font-['Inter:Medium',_sans-serif] font-medium leading-[14px] left-0 not-italic text-[14px] text-neutral-950 text-nowrap top-0 tracking-[-0.1504px] whitespace-pre">Password</p>
      <App5 />
    </div>
  );
}

function Input3() {
  return (
    <div className="bg-white h-[36px] relative rounded-[8px] shrink-0 w-full" data-name="Input">
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex h-[36px] items-center px-[12px] py-[4px] relative w-full">
          <p className="font-['Inter:Regular',_sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[14px] text-neutral-950 text-nowrap tracking-[-0.1504px] whitespace-pre">Create a password</p>
        </div>
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] h-[58px] items-start relative shrink-0 w-full" data-name="Container">
      <PrimitiveLabel4 />
      <Input3 />
    </div>
  );
}

function App6() {
  return (
    <div className="absolute h-[14px] left-[128.33px] top-0 w-[6.516px]" data-name="App">
      <p className="absolute font-['Inter:Medium',_sans-serif] font-medium leading-[14px] left-0 not-italic text-[#fb2c36] text-[14px] text-nowrap top-0 tracking-[-0.1504px] whitespace-pre">*</p>
    </div>
  );
}

function PrimitiveLabel5() {
  return (
    <div className="h-[14px] relative shrink-0 w-full" data-name="Primitive.label">
      <p className="absolute font-['Inter:Medium',_sans-serif] font-medium leading-[14px] left-0 not-italic text-[14px] text-neutral-950 text-nowrap top-0 tracking-[-0.1504px] whitespace-pre">Confirm Password</p>
      <App6 />
    </div>
  );
}

function Input4() {
  return (
    <div className="bg-white h-[36px] relative rounded-[8px] shrink-0 w-full" data-name="Input">
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex h-[36px] items-center px-[12px] py-[4px] relative w-full">
          <p className="font-['Inter:Regular',_sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[14px] text-neutral-950 text-nowrap tracking-[-0.1504px] whitespace-pre">Confirm your password</p>
        </div>
      </div>
    </div>
  );
}

function Container5() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] h-[58px] items-start relative shrink-0 w-full" data-name="Container">
      <PrimitiveLabel5 />
      <Input4 />
    </div>
  );
}

function App7() {
  return (
    <div className="absolute h-[14px] left-[128.33px] top-0 w-[6.516px]" data-name="App">
      <p className="absolute font-['Inter:Medium',_sans-serif] font-medium leading-[14px] left-0 not-italic text-[#fb2c36] text-[14px] text-nowrap top-0 tracking-[-0.1504px] whitespace-pre">*</p>
    </div>
  );
}

function PrimitiveLabel6() {
  return (
    <div className="h-[14px] relative shrink-0 w-full" data-name="Primitive.label">
      <p className="absolute font-['Inter:Medium',_sans-serif] font-medium h-[14px] leading-[14px] left-0 not-italic text-[14px] text-neutral-950 top-0 tracking-[-0.1504px] w-[135px]">REFERRAL</p>
      <App7 />
    </div>
  );
}

function Input5() {
  return (
    <div className="bg-white h-[36px] relative rounded-[8px] shrink-0 w-full" data-name="Input">
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex h-[36px] items-center px-[12px] py-[4px] relative w-full">
          <p className="font-['Inter:Regular',_sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[14px] text-neutral-950 text-nowrap tracking-[-0.1504px] whitespace-pre">Confirm your password</p>
        </div>
      </div>
    </div>
  );
}

function Container6() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] h-[58px] items-start relative shrink-0 w-full" data-name="Container">
      <PrimitiveLabel6 />
      <Input5 />
    </div>
  );
}

function Button() {
  return (
    <div className="bg-[#06a119] h-[36px] relative rounded-[8px] shrink-0 w-full" data-name="Button">
      <p className="absolute font-['Inter:Medium',_sans-serif] font-medium leading-[20px] left-[252.81px] not-italic text-[14px] text-nowrap text-white top-[8px] tracking-[-0.1504px] whitespace-pre">Create Account</p>
    </div>
  );
}

function App8() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[24px] h-[528px] items-start left-0 top-[-56px] w-[605px]" data-name="App">
      <Container />
      <Container1 />
      <Container2 />
      <Container3 />
      <Container4 />
      <Container5 />
      <Container6 />
      <Button />
    </div>
  );
}

function Frame3() {
  return (
    <div className="h-[498px] relative shrink-0 w-full">
      <App8 />
    </div>
  );
}

function TabPanel() {
  return (
    <div className="h-[518px] relative shrink-0 w-[605px]" data-name="Tab Panel">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[32px] h-[518px] items-start relative w-[605px]">
        <App />
        <Frame3 />
      </div>
    </div>
  );
}

function PrimitiveDiv() {
  return (
    <div className="content-stretch flex flex-col gap-[40px] h-[698px] items-start relative shrink-0 w-full" data-name="Primitive.div">
      <TabList />
      <TabPanel />
    </div>
  );
}

function Link() {
  return (
    <div className="absolute content-stretch flex h-[18px] items-start left-[290.37px] top-[3px] w-[121.734px]" data-name="Link">
      <p className="font-['Inter:Regular',_sans-serif] font-normal leading-[24px] not-italic relative shrink-0 text-[#106bb0] text-[16px] text-center text-nowrap tracking-[-0.3125px] whitespace-pre">Terms of Service</p>
    </div>
  );
}

function Link1() {
  return (
    <div className="absolute content-stretch flex h-[18px] items-start left-[447.53px] top-[3px] w-[100.188px]" data-name="Link">
      <p className="font-['Inter:Regular',_sans-serif] font-normal leading-[24px] not-italic relative shrink-0 text-[#106bb0] text-[16px] text-center text-nowrap tracking-[-0.3125px] whitespace-pre">Privacy Policy</p>
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[24px] left-[175.78px] not-italic text-[#717182] text-[16px] text-center top-0 tracking-[-0.3125px] translate-x-[-50%] w-[231px]">By continuing, you agree to our</p>
      <Link />
      <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[24px] left-[430.1px] not-italic text-[#717182] text-[16px] text-center top-0 tracking-[-0.3125px] translate-x-[-50%] w-[36px]">and</p>
      <Link1 />
    </div>
  );
}

function Container7() {
  return (
    <div className="absolute box-border content-stretch flex flex-col gap-[32px] h-[850px] items-start left-[205px] pb-0 pt-[48px] px-[32px] top-[192px] w-[672px]" data-name="Container">
      <PrimitiveDiv />
      <Paragraph1 />
    </div>
  );
}

function Heading1() {
  return (
    <div className="absolute h-[48px] left-[32px] top-[24px] w-[117.203px]" data-name="Heading 1">
      <p className="absolute font-['Inter:Medium',_sans-serif] font-medium leading-[48px] left-0 not-italic text-[32px] text-nowrap text-white top-0 tracking-[0.4063px] whitespace-pre">Register</p>
    </div>
  );
}

function Container8() {
  return <div className="absolute bg-white left-[735.89px] rounded-[33554428px] size-[6px] top-[95.42px]" data-name="Container" />;
}

function Container9() {
  return <div className="absolute bg-white left-[813.02px] rounded-[33554428px] size-[6px] top-[66.63px]" data-name="Container" />;
}

function Container10() {
  return <div className="absolute bg-white left-[342.61px] rounded-[33554428px] size-[6px] top-[6.11px]" data-name="Container" />;
}

function Container11() {
  return <div className="absolute bg-white left-[313.84px] rounded-[33554428px] size-[6px] top-[23.81px]" data-name="Container" />;
}

function Container12() {
  return <div className="absolute bg-white left-[390.38px] rounded-[33554428px] size-[6px] top-[41.27px]" data-name="Container" />;
}

function Container13() {
  return <div className="absolute bg-white left-[1009.56px] rounded-[33554428px] size-[6px] top-[60.45px]" data-name="Container" />;
}

function Container14() {
  return <div className="absolute bg-white left-[876.75px] rounded-[33554428px] size-[6px] top-[55.81px]" data-name="Container" />;
}

function Container15() {
  return <div className="absolute bg-white left-[278.39px] rounded-[33554428px] size-[6px] top-[34.13px]" data-name="Container" />;
}

function Container16() {
  return <div className="absolute bg-white left-[804.48px] rounded-[33554428px] size-[6px] top-[92.31px]" data-name="Container" />;
}

function Container17() {
  return <div className="absolute bg-white left-[927.7px] rounded-[33554428px] size-[6px] top-[6.63px]" data-name="Container" />;
}

function Container18() {
  return <div className="absolute bg-white left-[240.72px] rounded-[33554428px] size-[6px] top-[48.75px]" data-name="Container" />;
}

function Container19() {
  return <div className="absolute bg-white left-[825.84px] rounded-[33554428px] size-[6px] top-[67.56px]" data-name="Container" />;
}

function Container20() {
  return <div className="absolute bg-white left-[822.34px] rounded-[33554428px] size-[6px] top-[30.17px]" data-name="Container" />;
}

function Container21() {
  return <div className="absolute bg-white left-[903.61px] rounded-[33554428px] size-[6px] top-[41.25px]" data-name="Container" />;
}

function Container22() {
  return <div className="absolute bg-white left-[880.08px] rounded-[33554428px] size-[6px] top-[22.53px]" data-name="Container" />;
}

function Container23() {
  return <div className="absolute bg-white left-[414.83px] rounded-[33554428px] size-[6px] top-[44.86px]" data-name="Container" />;
}

function Container24() {
  return <div className="absolute bg-white left-[731.78px] rounded-[33554428px] size-[6px] top-[90.05px]" data-name="Container" />;
}

function Container25() {
  return <div className="absolute bg-white left-[996.28px] rounded-[33554428px] size-[6px] top-[89.27px]" data-name="Container" />;
}

function Container26() {
  return <div className="absolute bg-white left-[865.42px] rounded-[33554428px] size-[6px] top-[25.69px]" data-name="Container" />;
}

function Container27() {
  return <div className="absolute bg-white left-[502.3px] rounded-[33554428px] size-[6px] top-[45.33px]" data-name="Container" />;
}

function Container28() {
  return <div className="absolute bg-white left-[753.38px] rounded-[33554428px] size-[6px] top-[92.89px]" data-name="Container" />;
}

function Container29() {
  return <div className="absolute bg-white left-[565.55px] rounded-[33554428px] size-[6px] top-[81.16px]" data-name="Container" />;
}

function Container30() {
  return <div className="absolute bg-white left-[232.34px] rounded-[33554428px] size-[6px] top-[48.94px]" data-name="Container" />;
}

function Container31() {
  return <div className="absolute bg-white left-[732.61px] rounded-[33554428px] size-[6px] top-[45.56px]" data-name="Container" />;
}

function Container32() {
  return <div className="absolute bg-white left-[964.69px] rounded-[33554428px] size-[6px] top-[73.73px]" data-name="Container" />;
}

function Container33() {
  return <div className="absolute bg-white left-[277.45px] rounded-[33554428px] size-[6px] top-[36.69px]" data-name="Container" />;
}

function Container34() {
  return <div className="absolute bg-white left-[516.42px] rounded-[33554428px] size-[6px] top-[19.98px]" data-name="Container" />;
}

function Container35() {
  return <div className="absolute bg-white left-[683.03px] rounded-[33554428px] size-[6px] top-[84.52px]" data-name="Container" />;
}

function Container36() {
  return <div className="absolute bg-white left-[319.84px] rounded-[33554428px] size-[6px] top-[88.84px]" data-name="Container" />;
}

function Container37() {
  return <div className="absolute bg-white left-[340.78px] rounded-[33554428px] size-[6px] top-[93.16px]" data-name="Container" />;
}

function Container38() {
  return <div className="absolute bg-white left-[54.5px] rounded-[33554428px] size-[6px] top-[50.03px]" data-name="Container" />;
}

function Container39() {
  return <div className="absolute bg-white left-[773.06px] rounded-[33554428px] size-[6px] top-[79.34px]" data-name="Container" />;
}

function Container40() {
  return <div className="absolute bg-white left-[225.06px] rounded-[33554428px] size-[6px] top-[10.95px]" data-name="Container" />;
}

function Container41() {
  return <div className="absolute bg-white left-[446.25px] rounded-[33554428px] size-[6px] top-[42.84px]" data-name="Container" />;
}

function Container42() {
  return <div className="absolute bg-white left-[619.55px] rounded-[33554428px] size-[6px] top-[72.53px]" data-name="Container" />;
}

function Container43() {
  return <div className="absolute bg-white left-[707.22px] rounded-[33554428px] size-[6px] top-[63.89px]" data-name="Container" />;
}

function Container44() {
  return <div className="absolute bg-white left-[278.36px] rounded-[33554428px] size-[6px] top-[13.25px]" data-name="Container" />;
}

function Container45() {
  return <div className="absolute bg-white left-[995.33px] rounded-[33554428px] size-[6px] top-[57.56px]" data-name="Container" />;
}

function Container46() {
  return <div className="absolute bg-white left-[136.03px] rounded-[33554428px] size-[6px] top-[32.09px]" data-name="Container" />;
}

function Container47() {
  return <div className="absolute bg-white left-[776.83px] rounded-[33554428px] size-[6px] top-[49.47px]" data-name="Container" />;
}

function Container48() {
  return <div className="absolute bg-white left-[963.72px] rounded-[33554428px] size-[6px] top-[21.34px]" data-name="Container" />;
}

function Container49() {
  return <div className="absolute bg-white left-[14.11px] rounded-[33554428px] size-[6px] top-[39.75px]" data-name="Container" />;
}

function Container50() {
  return <div className="absolute bg-white left-[459.98px] rounded-[33554428px] size-[6px] top-[67.91px]" data-name="Container" />;
}

function Container51() {
  return <div className="absolute bg-white left-[721.44px] rounded-[33554428px] size-[6px] top-[60.06px]" data-name="Container" />;
}

function Container52() {
  return <div className="absolute bg-white left-[737.97px] rounded-[33554428px] size-[6px] top-[28.67px]" data-name="Container" />;
}

function Container53() {
  return <div className="absolute bg-white left-[307.67px] rounded-[33554428px] size-[6px] top-[39.25px]" data-name="Container" />;
}

function Container54() {
  return <div className="absolute bg-white left-[125.73px] rounded-[33554428px] size-[6px] top-[34.28px]" data-name="Container" />;
}

function Container55() {
  return <div className="absolute bg-white left-[13.11px] rounded-[33554428px] size-[6px] top-[14.73px]" data-name="Container" />;
}

function Container56() {
  return <div className="absolute bg-white left-[450.97px] rounded-[33554428px] size-[6px] top-[5.86px]" data-name="Container" />;
}

function Container57() {
  return <div className="absolute bg-white left-[797.88px] rounded-[33554428px] size-[6px] top-[70.7px]" data-name="Container" />;
}

function Container58() {
  return (
    <div className="absolute h-[96px] left-0 opacity-30 overflow-clip top-0 w-[1052px]" data-name="Container">
      <Container8 />
      <Container9 />
      <Container10 />
      <Container11 />
      <Container12 />
      <Container13 />
      <Container14 />
      <Container15 />
      <Container16 />
      <Container17 />
      <Container18 />
      <Container19 />
      <Container20 />
      <Container21 />
      <Container22 />
      <Container23 />
      <Container24 />
      <Container25 />
      <Container26 />
      <Container27 />
      <Container28 />
      <Container29 />
      <Container30 />
      <Container31 />
      <Container32 />
      <Container33 />
      <Container34 />
      <Container35 />
      <Container36 />
      <Container37 />
      <Container38 />
      <Container39 />
      <Container40 />
      <Container41 />
      <Container42 />
      <Container43 />
      <Container44 />
      <Container45 />
      <Container46 />
      <Container47 />
      <Container48 />
      <Container49 />
      <Container50 />
      <Container51 />
      <Container52 />
      <Container53 />
      <Container54 />
      <Container55 />
      <Container56 />
      <Container57 />
    </div>
  );
}

function Container59() {
  return (
    <div className="absolute h-[96px] left-0 top-[106px] w-[1052px]" data-name="Container">
      <Heading1 />
      <Container58 />
    </div>
  );
}

export default function App9() {
  return (
    <div className="bg-white relative size-full" data-name="App">
      <Container7 />
      <Container59 />
    </div>
  );
}