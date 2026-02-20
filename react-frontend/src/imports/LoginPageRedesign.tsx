import svgPaths from "./svg-05abc4dhxb";
import imgOrgPathLogo from "figma:asset/14a60264b78587869b56f72931cec7ab37456ec9.png";
import imgImageReCaptchaVerification from "figma:asset/0501155e0f325996fa05ee0df08493b90073f143.png";

function OrgPathLogo() {
  return (
    <div className="h-[64px] relative shrink-0 w-[239.516px]" data-name="OrgPathLogo">
      <img alt="" className="absolute bg-clip-padding border-0 border-[transparent] border-solid box-border inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgOrgPathLogo} />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[64px] w-[239.516px]" />
    </div>
  );
}

function Icon() {
  return (
    <div className="absolute left-[12px] size-[16px] top-[10px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p203476e0} id="Vector" stroke="var(--stroke-0, #106BB0)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M12.6667 8H3.33333" id="Vector_2" stroke="var(--stroke-0, #106BB0)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button() {
  return (
    <div className="h-[36px] relative rounded-[8px] shrink-0 w-[140.203px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[36px] relative w-[140.203px]">
        <Icon />
        <p className="absolute font-['Inter:Medium',_sans-serif] font-medium leading-[20px] left-[36px] not-italic text-[#106bb0] text-[14px] text-nowrap top-[8px] tracking-[-0.1504px] whitespace-pre">Back to Home</p>
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="absolute box-border content-stretch flex h-[112px] items-center justify-between left-0 px-[32px] py-0 top-0 w-[1199px]" data-name="Container">
      <OrgPathLogo />
      <Button />
    </div>
  );
}

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

function Heading1() {
  return (
    <div className="h-[30px] relative shrink-0 w-full" data-name="Heading 2">
      <p className="absolute font-['Inter:Medium',_sans-serif] font-medium leading-[30px] left-[304.45px] not-italic text-[20px] text-center text-neutral-950 text-nowrap top-0 tracking-[-0.4492px] translate-x-[-50%] whitespace-pre">Enter your details</p>
    </div>
  );
}

function Paragraph() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[24px] left-[303.9px] not-italic text-[#717182] text-[16px] text-center text-nowrap top-0 tracking-[-0.3125px] translate-x-[-50%] whitespace-pre">{`We don't use your details for marketing purposes`}</p>
    </div>
  );
}

function AuthPage() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] h-[62px] items-start relative shrink-0 w-full" data-name="AuthPage">
      <Heading1 />
      <Paragraph />
    </div>
  );
}

function AuthPage1() {
  return (
    <div className="absolute h-[14px] left-[79.34px] top-0 w-[6.516px]" data-name="AuthPage">
      <p className="absolute font-['Inter:Medium',_sans-serif] font-medium leading-[14px] left-0 not-italic text-[#fb2c36] text-[14px] text-nowrap top-0 tracking-[-0.1504px] whitespace-pre">*</p>
    </div>
  );
}

function PrimitiveLabel() {
  return (
    <div className="h-[14px] relative shrink-0 w-full" data-name="Primitive.label">
      <p className="absolute font-['Inter:Medium',_sans-serif] font-medium leading-[14px] left-0 not-italic text-[14px] text-neutral-950 text-nowrap top-0 tracking-[-0.1504px] whitespace-pre">First Name</p>
      <AuthPage1 />
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

function Container1() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] h-[58px] items-start relative shrink-0 w-full" data-name="Container">
      <PrimitiveLabel />
      <Input />
    </div>
  );
}

function AuthPage2() {
  return (
    <div className="absolute h-[14px] left-[78.27px] top-0 w-[6.516px]" data-name="AuthPage">
      <p className="absolute font-['Inter:Medium',_sans-serif] font-medium leading-[14px] left-0 not-italic text-[#fb2c36] text-[14px] text-nowrap top-0 tracking-[-0.1504px] whitespace-pre">*</p>
    </div>
  );
}

function PrimitiveLabel1() {
  return (
    <div className="h-[14px] relative shrink-0 w-full" data-name="Primitive.label">
      <p className="absolute font-['Inter:Medium',_sans-serif] font-medium leading-[14px] left-0 not-italic text-[14px] text-neutral-950 text-nowrap top-0 tracking-[-0.1504px] whitespace-pre">Last Name</p>
      <AuthPage2 />
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

function Container2() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] h-[58px] items-start relative shrink-0 w-full" data-name="Container">
      <PrimitiveLabel1 />
      <Input1 />
    </div>
  );
}

function AuthPage3() {
  return (
    <div className="absolute h-[14px] left-[101.39px] top-0 w-[6.516px]" data-name="AuthPage">
      <p className="absolute font-['Inter:Medium',_sans-serif] font-medium leading-[14px] left-0 not-italic text-[#fb2c36] text-[14px] text-nowrap top-0 tracking-[-0.1504px] whitespace-pre">*</p>
    </div>
  );
}

function PrimitiveLabel2() {
  return (
    <div className="h-[14px] relative shrink-0 w-full" data-name="Primitive.label">
      <p className="absolute font-['Inter:Medium',_sans-serif] font-medium leading-[14px] left-0 not-italic text-[14px] text-neutral-950 text-nowrap top-0 tracking-[-0.1504px] whitespace-pre">Email Address</p>
      <AuthPage3 />
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

function Container3() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] h-[58px] items-start relative shrink-0 w-full" data-name="Container">
      <PrimitiveLabel2 />
      <Input2 />
    </div>
  );
}

function AuthPage4() {
  return (
    <div className="absolute h-[14px] left-[61.09px] top-0 w-[6.516px]" data-name="AuthPage">
      <p className="absolute font-['Inter:Medium',_sans-serif] font-medium leading-[14px] left-0 not-italic text-[#fb2c36] text-[14px] text-nowrap top-0 tracking-[-0.1504px] whitespace-pre">*</p>
    </div>
  );
}

function PrimitiveLabel3() {
  return (
    <div className="h-[14px] relative shrink-0 w-full" data-name="Primitive.label">
      <p className="absolute font-['Inter:Medium',_sans-serif] font-medium leading-[14px] left-0 not-italic text-[14px] text-neutral-950 text-nowrap top-0 tracking-[-0.1504px] whitespace-pre">Country</p>
      <AuthPage4 />
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

function Icon1() {
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
          <Icon1 />
        </div>
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] h-[58px] items-start relative shrink-0 w-full" data-name="Container">
      <PrimitiveLabel3 />
      <PrimitiveButton2 />
    </div>
  );
}

function AuthPage5() {
  return (
    <div className="absolute h-[14px] left-[71.69px] top-0 w-[6.516px]" data-name="AuthPage">
      <p className="absolute font-['Inter:Medium',_sans-serif] font-medium leading-[14px] left-0 not-italic text-[#fb2c36] text-[14px] text-nowrap top-0 tracking-[-0.1504px] whitespace-pre">*</p>
    </div>
  );
}

function PrimitiveLabel4() {
  return (
    <div className="h-[14px] relative shrink-0 w-full" data-name="Primitive.label">
      <p className="absolute font-['Inter:Medium',_sans-serif] font-medium leading-[14px] left-0 not-italic text-[14px] text-neutral-950 text-nowrap top-0 tracking-[-0.1504px] whitespace-pre">Password</p>
      <AuthPage5 />
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

function Container5() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] h-[58px] items-start relative shrink-0 w-full" data-name="Container">
      <PrimitiveLabel4 />
      <Input3 />
    </div>
  );
}

function AuthPage6() {
  return (
    <div className="absolute h-[14px] left-[128.33px] top-0 w-[6.516px]" data-name="AuthPage">
      <p className="absolute font-['Inter:Medium',_sans-serif] font-medium leading-[14px] left-0 not-italic text-[#fb2c36] text-[14px] text-nowrap top-0 tracking-[-0.1504px] whitespace-pre">*</p>
    </div>
  );
}

function PrimitiveLabel5() {
  return (
    <div className="h-[14px] relative shrink-0 w-full" data-name="Primitive.label">
      <p className="absolute font-['Inter:Medium',_sans-serif] font-medium leading-[14px] left-0 not-italic text-[14px] text-neutral-950 text-nowrap top-0 tracking-[-0.1504px] whitespace-pre">Confirm Password</p>
      <AuthPage6 />
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

function Container6() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] h-[58px] items-start relative shrink-0 w-full" data-name="Container">
      <PrimitiveLabel5 />
      <Input4 />
    </div>
  );
}

function AuthPage7() {
  return (
    <div className="absolute h-[15px] left-[140.8px] top-0 w-[7.781px]" data-name="AuthPage">
      <p className="absolute font-['Inter:Bold',_sans-serif] font-bold leading-[15px] left-0 not-italic text-[#fb2c36] text-[15px] text-nowrap top-[-1px] tracking-[0.5156px] uppercase whitespace-pre">*</p>
    </div>
  );
}

function PrimitiveLabel6() {
  return (
    <div className="h-[15px] relative shrink-0 w-full" data-name="Primitive.label">
      <p className="absolute font-['Inter:Bold',_sans-serif] font-bold leading-[15px] left-0 not-italic text-[#106bb0] text-[15px] text-nowrap top-[-1px] tracking-[0.5156px] uppercase whitespace-pre">REFERRAL CODE</p>
      <AuthPage7 />
    </div>
  );
}

function Input5() {
  return (
    <div className="bg-white h-[36px] relative rounded-[8px] shrink-0 w-full" data-name="Input">
      <div aria-hidden="true" className="absolute border-2 border-[#8ec5ff] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex h-[36px] items-center px-[12px] py-[4px] relative w-full">
          <p className="font-['Inter:Regular',_sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[14px] text-neutral-950 text-nowrap tracking-[-0.1504px] whitespace-pre">Enter your referral code</p>
        </div>
      </div>
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="content-stretch flex h-[16px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="basis-0 font-['Inter:Regular',_sans-serif] font-normal grow leading-[16px] min-h-px min-w-px not-italic relative shrink-0 text-[#717182] text-[12px]">⚠️ A valid referral code is required to create an account</p>
    </div>
  );
}

function Container7() {
  return (
    <div className="bg-gradient-to-r from-[#eff6ff] h-[119px] relative rounded-[10px] shrink-0 to-[#f0fdf4] w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-2 border-[#bedbff] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[8px] h-[119px] items-start pb-[2px] pt-[18px] px-[18px] relative w-full">
          <PrimitiveLabel6 />
          <Input5 />
          <Paragraph1 />
        </div>
      </div>
    </div>
  );
}

function ImageReCaptchaVerification() {
  return (
    <div className="h-[54px] relative shrink-0 w-[608px]" data-name="Image (reCAPTCHA verification)">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImageReCaptchaVerification} />
    </div>
  );
}

function Button1() {
  return (
    <div className="bg-[#06a119] h-[36px] relative rounded-[8px] shrink-0 w-full" data-name="Button">
      <p className="absolute font-['Inter:Medium',_sans-serif] font-medium leading-[20px] left-[252.81px] not-italic text-[14px] text-nowrap text-white top-[8px] tracking-[-0.1504px] whitespace-pre">Create Account</p>
    </div>
  );
}

function AuthPage8() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] h-[728.391px] items-start relative shrink-0 w-full" data-name="AuthPage">
      <Container1 />
      <Container2 />
      <Container3 />
      <Container4 />
      <Container5 />
      <Container6 />
      <Container7 />
      <ImageReCaptchaVerification />
      <Button1 />
    </div>
  );
}

function TabPanel() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[608px]" data-name="Tab Panel">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[32px] h-full items-start relative w-[608px]">
        <AuthPage />
        <AuthPage8 />
      </div>
    </div>
  );
}

function PrimitiveDiv() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[40px] h-[898.391px] items-start left-[32px] top-[48px] w-[608px]" data-name="Primitive.div">
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

function Paragraph2() {
  return (
    <div className="absolute h-[24px] left-[32px] top-[978.39px] w-[608px]" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[24px] left-[175.78px] not-italic text-[#717182] text-[16px] text-center top-0 tracking-[-0.3125px] translate-x-[-50%] w-[231px]">By continuing, you agree to our</p>
      <Link />
      <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[24px] left-[430.1px] not-italic text-[#717182] text-[16px] text-center top-0 tracking-[-0.3125px] translate-x-[-50%] w-[36px]">and</p>
      <Link1 />
    </div>
  );
}

function OrgPathLogo1() {
  return (
    <div className="basis-0 grow h-[64px] min-h-px min-w-px relative shrink-0" data-name="OrgPathLogo">
      <img alt="" className="absolute bg-clip-padding border-0 border-[transparent] border-solid box-border inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgOrgPathLogo} />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[64px] w-full" />
    </div>
  );
}

function Text() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[210.594px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-full relative w-[210.594px]">
        <p className="absolute font-['Inter:Semi_Bold',_sans-serif] font-semibold leading-[24px] left-0 not-italic text-[#106bb0] text-[16px] text-nowrap top-0 tracking-[0.0875px] whitespace-pre">Know More About OrgPath</p>
      </div>
    </div>
  );
}

function Text1() {
  return (
    <div className="h-[16px] relative shrink-0 w-[107.984px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[16px] items-start relative w-[107.984px]">
        <p className="font-['Inter:Regular',_sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[#717182] text-[12px] text-nowrap whitespace-pre">Visit our website →</p>
      </div>
    </div>
  );
}

function Container8() {
  return (
    <div className="h-[40px] relative shrink-0 w-[210.594px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col h-[40px] items-start relative w-[210.594px]">
        <Text />
        <Text1 />
      </div>
    </div>
  );
}

function Link2() {
  return (
    <div className="absolute box-border content-stretch flex gap-[12px] h-[100px] items-center left-[78.94px] px-[26px] py-[2px] rounded-[10px] top-[1034.39px] w-[514.109px]" data-name="Link">
      <div aria-hidden="true" className="absolute border-2 border-[#106bb0] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <OrgPathLogo1 />
      <Container8 />
    </div>
  );
}

function Container9() {
  return (
    <div className="absolute h-[1182.391px] left-[263.5px] top-[208px] w-[672px]" data-name="Container">
      <PrimitiveDiv />
      <Paragraph2 />
      <Link2 />
    </div>
  );
}

function Heading() {
  return (
    <div className="absolute h-[48px] left-[32px] top-[24px] w-[117.203px]" data-name="Heading 1">
      <p className="absolute font-['Inter:Medium',_sans-serif] font-medium leading-[48px] left-0 not-italic text-[32px] text-nowrap text-white top-0 tracking-[0.4063px] whitespace-pre">Register</p>
    </div>
  );
}

function Container10() {
  return <div className="absolute bg-white left-[502.95px] rounded-[33554428px] size-[6px] top-[19.2px]" data-name="Container" />;
}

function Container11() {
  return <div className="absolute bg-white left-[512.67px] rounded-[33554428px] size-[6px] top-[89px]" data-name="Container" />;
}

function Container12() {
  return <div className="absolute bg-white left-[35.56px] rounded-[33554428px] size-[6px] top-[40.64px]" data-name="Container" />;
}

function Container13() {
  return <div className="absolute bg-white left-[320.44px] rounded-[33554428px] size-[6px] top-[0.86px]" data-name="Container" />;
}

function Container14() {
  return <div className="absolute bg-white left-[299.28px] rounded-[33554428px] size-[6px] top-[30.89px]" data-name="Container" />;
}

function Container15() {
  return <div className="absolute bg-white left-[48.55px] rounded-[33554428px] size-[6px] top-[55.75px]" data-name="Container" />;
}

function Container16() {
  return <div className="absolute bg-white left-[195.05px] rounded-[33554428px] size-[6px] top-[81.59px]" data-name="Container" />;
}

function Container17() {
  return <div className="absolute bg-white left-[1012.47px] rounded-[33554428px] size-[6px] top-[37.38px]" data-name="Container" />;
}

function Container18() {
  return <div className="absolute bg-white left-[608.08px] rounded-[33554428px] size-[6px] top-[6.17px]" data-name="Container" />;
}

function Container19() {
  return <div className="absolute bg-white left-[650.53px] rounded-[33554428px] size-[6px] top-[91.44px]" data-name="Container" />;
}

function Container20() {
  return <div className="absolute bg-white left-[775.98px] rounded-[33554428px] size-[6px] top-[49.75px]" data-name="Container" />;
}

function Container21() {
  return <div className="absolute bg-white left-[747.14px] rounded-[33554428px] size-[6px] top-[14.91px]" data-name="Container" />;
}

function Container22() {
  return <div className="absolute bg-white left-[132.73px] rounded-[33554428px] size-[6px] top-[25.14px]" data-name="Container" />;
}

function Container23() {
  return <div className="absolute bg-white left-[144.94px] rounded-[33554428px] size-[6px] top-[67.77px]" data-name="Container" />;
}

function Container24() {
  return <div className="absolute bg-white left-[9.06px] rounded-[33554428px] size-[6px] top-[24.83px]" data-name="Container" />;
}

function Container25() {
  return <div className="absolute bg-white left-[696.67px] rounded-[33554428px] size-[6px] top-[24.27px]" data-name="Container" />;
}

function Container26() {
  return <div className="absolute bg-white left-[928.22px] rounded-[33554428px] size-[6px] top-[6.77px]" data-name="Container" />;
}

function Container27() {
  return <div className="absolute bg-white left-[429.77px] rounded-[33554428px] size-[6px] top-[2.56px]" data-name="Container" />;
}

function Container28() {
  return <div className="absolute bg-white left-[1184.31px] rounded-[33554428px] size-[6px] top-[16.66px]" data-name="Container" />;
}

function Container29() {
  return <div className="absolute bg-white left-[642.67px] rounded-[33554428px] size-[6px] top-[57.2px]" data-name="Container" />;
}

function Container30() {
  return <div className="absolute bg-white left-[1119.47px] rounded-[33554428px] size-[6px] top-[87.41px]" data-name="Container" />;
}

function Container31() {
  return <div className="absolute bg-white left-[1056.81px] rounded-[33554428px] size-[6px] top-[20.83px]" data-name="Container" />;
}

function Container32() {
  return <div className="absolute bg-white left-[233.14px] rounded-[33554428px] size-[6px] top-[35.95px]" data-name="Container" />;
}

function Container33() {
  return <div className="absolute bg-white left-[552.98px] rounded-[33554428px] size-[6px] top-[48.78px]" data-name="Container" />;
}

function Container34() {
  return <div className="absolute bg-white left-[93.5px] rounded-[33554428px] size-[6px] top-[45.22px]" data-name="Container" />;
}

function Container35() {
  return <div className="absolute bg-white left-[678.17px] rounded-[33554428px] size-[6px] top-[12.86px]" data-name="Container" />;
}

function Container36() {
  return <div className="absolute bg-white left-[1065.3px] rounded-[33554428px] size-[6px] top-[93.86px]" data-name="Container" />;
}

function Container37() {
  return <div className="absolute bg-white left-[560.66px] rounded-[33554428px] size-[6px] top-[61.56px]" data-name="Container" />;
}

function Container38() {
  return <div className="absolute bg-white left-[411.3px] rounded-[33554428px] size-[6px] top-[63.38px]" data-name="Container" />;
}

function Container39() {
  return <div className="absolute bg-white left-[1127.23px] rounded-[33554428px] size-[6px] top-[25.98px]" data-name="Container" />;
}

function Container40() {
  return <div className="absolute bg-white left-[839.73px] rounded-[33554428px] size-[6px] top-[66.28px]" data-name="Container" />;
}

function Container41() {
  return <div className="absolute bg-white left-[662.02px] rounded-[33554428px] size-[6px] top-[16.83px]" data-name="Container" />;
}

function Container42() {
  return <div className="absolute bg-white left-[956.09px] rounded-[33554428px] size-[6px] top-[63.34px]" data-name="Container" />;
}

function Container43() {
  return <div className="absolute bg-white left-[482.31px] rounded-[33554428px] size-[6px] top-[75.7px]" data-name="Container" />;
}

function Container44() {
  return <div className="absolute bg-white left-[1125.78px] rounded-[33554428px] size-[6px] top-[90.7px]" data-name="Container" />;
}

function Container45() {
  return <div className="absolute bg-white left-[420.84px] rounded-[33554428px] size-[6px] top-[35.86px]" data-name="Container" />;
}

function Container46() {
  return <div className="absolute bg-white left-[942.98px] rounded-[33554428px] size-[6px] top-[25.53px]" data-name="Container" />;
}

function Container47() {
  return <div className="absolute bg-white left-[574.88px] rounded-[33554428px] size-[6px] top-[67.53px]" data-name="Container" />;
}

function Container48() {
  return <div className="absolute bg-white left-[550.17px] rounded-[33554428px] size-[6px] top-[6.61px]" data-name="Container" />;
}

function Container49() {
  return <div className="absolute bg-white left-[232.69px] rounded-[33554428px] size-[6px] top-[70.3px]" data-name="Container" />;
}

function Container50() {
  return <div className="absolute bg-white left-[368.09px] rounded-[33554428px] size-[6px] top-[59.58px]" data-name="Container" />;
}

function Container51() {
  return <div className="absolute bg-white left-[914.17px] rounded-[33554428px] size-[6px] top-[92.05px]" data-name="Container" />;
}

function Container52() {
  return <div className="absolute bg-white left-[567.92px] rounded-[33554428px] size-[6px] top-[49.83px]" data-name="Container" />;
}

function Container53() {
  return <div className="absolute bg-white left-[257.44px] rounded-[33554428px] size-[6px] top-[5px]" data-name="Container" />;
}

function Container54() {
  return <div className="absolute bg-white left-[217.16px] rounded-[33554428px] size-[6px] top-[87.95px]" data-name="Container" />;
}

function Container55() {
  return <div className="absolute bg-white left-[1066.8px] rounded-[33554428px] size-[6px] top-[58.75px]" data-name="Container" />;
}

function Container56() {
  return <div className="absolute bg-white left-[1110.19px] rounded-[33554428px] size-[6px] top-[52.59px]" data-name="Container" />;
}

function Container57() {
  return <div className="absolute bg-white left-[222.81px] rounded-[33554428px] size-[6px] top-[75.14px]" data-name="Container" />;
}

function Container58() {
  return <div className="absolute bg-white left-[84.84px] rounded-[33554428px] size-[6px] top-[10.81px]" data-name="Container" />;
}

function Container59() {
  return <div className="absolute bg-white left-[746.14px] rounded-[33554428px] size-[6px] top-[74.34px]" data-name="Container" />;
}

function Container60() {
  return (
    <div className="absolute h-[96px] left-0 opacity-30 overflow-clip top-0 w-[1199px]" data-name="Container">
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
      <Container58 />
      <Container59 />
    </div>
  );
}

function Container61() {
  return (
    <div className="absolute h-[96px] left-0 top-[112px] w-[1199px]" data-name="Container">
      <Heading />
      <Container60 />
    </div>
  );
}

function AuthPage9() {
  return (
    <div className="absolute bg-white h-[1390.391px] left-0 top-0 w-[1199px]" data-name="AuthPage">
      <Container />
      <Container9 />
      <Container61 />
    </div>
  );
}

function SelectItemText() {
  return (
    <div className="h-0 relative shrink-0 w-full" data-name="SelectItemText">
      <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[normal] left-0 not-italic text-[16px] text-neutral-950 top-0 tracking-[-0.3125px] w-0">United States</p>
    </div>
  );
}

function SelectItemText1() {
  return (
    <div className="h-0 relative shrink-0 w-full" data-name="SelectItemText">
      <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[normal] left-0 not-italic text-[16px] text-neutral-950 top-0 tracking-[-0.3125px] w-0">United Kingdom</p>
    </div>
  );
}

function SelectItemText2() {
  return (
    <div className="h-0 relative shrink-0 w-full" data-name="SelectItemText">
      <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[normal] left-0 not-italic text-[16px] text-neutral-950 top-0 tracking-[-0.3125px] w-0">Canada</p>
    </div>
  );
}

function SelectItemText3() {
  return (
    <div className="h-0 relative shrink-0 w-full" data-name="SelectItemText">
      <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[normal] left-0 not-italic text-[16px] text-neutral-950 top-0 tracking-[-0.3125px] w-0">Australia</p>
    </div>
  );
}

function SelectItemText4() {
  return (
    <div className="h-0 relative shrink-0 w-full" data-name="SelectItemText">
      <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[normal] left-0 not-italic text-[16px] text-neutral-950 top-0 tracking-[-0.3125px] w-0">Germany</p>
    </div>
  );
}

function SelectItemText5() {
  return (
    <div className="h-0 relative shrink-0 w-full" data-name="SelectItemText">
      <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[normal] left-0 not-italic text-[16px] text-neutral-950 top-0 tracking-[-0.3125px] w-0">France</p>
    </div>
  );
}

function SelectItemText6() {
  return (
    <div className="h-0 relative shrink-0 w-full" data-name="SelectItemText">
      <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[normal] left-0 not-italic text-[16px] text-neutral-950 top-0 tracking-[-0.3125px] w-0">India</p>
    </div>
  );
}

function SelectItemText7() {
  return (
    <div className="h-0 relative shrink-0 w-full" data-name="SelectItemText">
      <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[normal] left-0 not-italic text-[16px] text-neutral-950 top-0 tracking-[-0.3125px] w-0">Japan</p>
    </div>
  );
}

function SelectItemText8() {
  return (
    <div className="h-0 relative shrink-0 w-full" data-name="SelectItemText">
      <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[normal] left-0 not-italic text-[16px] text-neutral-950 top-0 tracking-[-0.3125px] w-0">Other</p>
    </div>
  );
}

function SlotClone() {
  return (
    <div className="absolute box-border content-stretch flex flex-col h-[18px] items-start left-[294.5px] overflow-clip pb-0 pr-[295.5px] rounded-[5px] top-[737px] w-px" data-name="SlotClone">
      <SelectItemText />
      <SelectItemText1 />
      <SelectItemText2 />
      <SelectItemText3 />
      <SelectItemText4 />
      <SelectItemText5 />
      <SelectItemText6 />
      <SelectItemText7 />
      <SelectItemText8 />
    </div>
  );
}

export default function LoginPageRedesign() {
  return (
    <div className="bg-white relative size-full" data-name="Login Page Redesign">
      <AuthPage9 />
      <SlotClone />
    </div>
  );
}