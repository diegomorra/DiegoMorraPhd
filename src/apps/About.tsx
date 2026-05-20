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
          Diego Morra is a Postdoctoral Researcher at the{" "}
          <strong>MIT Senseable City Lab</strong>. His research explores the
          intersection of{" "}
          <strong>computer science, accessibility, and urban well-being</strong>
          , leveraging interactive technologies and artificial intelligence. He
          holds a background in <strong>Interaction Design</strong> and a{" "}
          <strong>PhD in Information Technology</strong> from the Department of
          Electronics, Information,
          and Bioengineering (DEIB) at <strong>Politecnico di Milano</strong>,
          where he focused on the design of interactive technologies for{" "}
          <strong>people with disabilities</strong>. Diego's work has been
          published in high-impact journals and presented at leading conferences
          in <strong>human-computer interaction</strong> and interactive
          systems.
        </p>
      </Section>

      <Section title="Current position">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 12,
          }}
        >
          <p style={{ margin: 0 }}>
            <strong>Postdoctoral Researcher</strong>
            <br />
            MIT Senseable City Lab
            <br />
            Massachusetts Institute of Technology
          </p>
          <img
            src="/mit-logo-pixel.png"
            alt="Massachusetts Institute of Technology"
            style={{
              width: 96,
              height: 64,
              flexShrink: 0,
              imageRendering: "pixelated",
            }}
          />
        </div>
      </Section>

      <Section title="Education">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 12,
          }}
        >
          <p style={{ margin: 0 }}>
            <strong>Ph.D. in Information Technology</strong>
            <br />
            Department of Electronics, Information and Bioengineering (DEIB)
            <br />
            Politecnico di Milano
          </p>
          <img
            src="/polimi-logo-pixel.png"
            alt="Politecnico di Milano"
            style={{
              width: 86,
              height: 64,
              flexShrink: 0,
              imageRendering: "pixelated",
            }}
          />
        </div>
      </Section>

      <Section title="Research interests">
        <BulletList
          items={[
            "Human-Computer Interaction (HCI)",
            "Accessibility and Wellbeing",
            "IoT and Tangible Technologies",
            "Urban Sensing and Citizen Science",
            "LLMs and Computer Vision",
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
