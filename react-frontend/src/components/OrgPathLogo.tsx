import logoImage from "figma:asset/14a60264b78587869b56f72931cec7ab37456ec9.png";

export function OrgPathLogo() {
  return (
    <div className="flex items-center">
      <img 
        src={logoImage} 
        alt="Orgpath - Building Innovative Pathways" 
        className="h-16 w-auto"
      />
    </div>
  );
}
