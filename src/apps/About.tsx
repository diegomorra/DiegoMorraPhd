export function About() {
  return (
    <div
      className="notepad-body"
      style={{ padding: 14, lineHeight: 1.45 }}
    >
      <div
        style={{
          display: "flex",
          gap: 14,
          marginBottom: 14,
          alignItems: "flex-start",
        }}
      >
        <div
          style={{
            padding: 3,
            background: "#c0c0c0",
            boxShadow:
              "inset 1px 1px 0 #808080, inset -1px -1px 0 #ffffff, inset 2px 2px 0 #404040, inset -2px -2px 0 #dfdfdf",
            flexShrink: 0,
          }}
        >
          <img
            src="/DM_profilepic.png"
            alt="Diego Morra"
            style={{
              display: "block",
              width: 100,
              height: 100,
              objectFit: "cover",
              imageRendering: "auto",
            }}
          />
        </div>
        <div style={{ minWidth: 0 }}>
          <h2 style={{ margin: "0 0 4px", fontSize: 14 }}>Diego Morra Ph.D.</h2>
          <p style={{ margin: 0, color: "#404040", fontSize: 11 }}>
            Postdoctoral Researcher
            <br />
            MIT Senseable City Lab
          </p>
        </div>
      </div>

      <Section title="Bio">
        <p style={{ margin: 0 }}>
          Diego Morra is a Postdoctoral Researcher at the MIT Senseable City
          Lab. His research explores the intersection of computer science,
          accessibility, and urban well-being, leveraging interactive
          technologies and artificial intelligence. He holds a background in
          Interaction Design and a PhD in Information Technology from the
          Department of Electronics, Information, and Bioengineering (DEIB) at
          Politecnico di Milano, where he focused on the design of interactive
          technologies for people with disabilities. Diego's work has been
          published in high-impact journals and presented at leading
          conferences in human-computer interaction and interactive systems.
        </p>
      </Section>

      <Section title="Current position">
        <p style={{ margin: 0 }}>
          Postdoctoral Researcher
          <br />
          MIT Senseable City Lab
          <br />
          Massachusetts Institute of Technology
        </p>
      </Section>

      <Section title="Research interests">
        <BulletList
          items={[
            "Human-Computer Interaction (HCI)",
            "Inclusive and Accessible Design",
            "Assistive and Tangible Technologies",
            "Urban Well-being and Computational Cities",
            "Human-AI Interaction",
            "Co-design and Participatory Methods",
          ]}
        />
      </Section>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div style={{ marginBottom: 12 }}>
      <h3
        style={{
          fontSize: 11,
          color: "#000080",
          margin: "0 0 4px",
          letterSpacing: 0.5,
          textTransform: "uppercase",
          borderBottom: "1px solid #c0c0c0",
          paddingBottom: 2,
        }}
      >
        {title}
      </h3>
      {children}
    </div>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul
      style={{
        margin: 0,
        paddingLeft: 18,
        listStyle: "square",
      }}
    >
      {items.map((it, i) => (
        <li key={i} style={{ marginBottom: 2 }}>
          {it}
        </li>
      ))}
    </ul>
  );
}
