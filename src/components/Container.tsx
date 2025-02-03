export interface ContainerProps {
  children: React.ReactNode;
}

export default function Container({ children }: ContainerProps) {
  return (
    <div style={{ padding: "20px", fontSize: "1.5rem", fontFamily: "Arial" }}>
      <h1 style={{ textAlign: "center" }}>Rema Testing</h1>
      {children}
    </div>
  );
}
