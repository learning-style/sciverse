# **AI-Enhanced Dynamic Learning Environment for Forces and Motion: Curriculum Design and LLM Integration Strategy**

## **I. Strategic Overview and Pedagogical Alignment**

The development of an interactive educational platform focusing on the Forces and Motion module requires a foundational strategy that merges high-fidelity dynamic simulation with personalized, adaptive instruction. The project currently exists as a technical skeleton featuring a 2D React canvas and a locally inferred Large Language Model (LLM) utilizing a gpt-oss 20b model at the specified proxy. To transform this skeleton into a robust pedagogical tool, the architectural design must be grounded in established Physics Education Research (PER) principles, ensuring that the technology facilitates active knowledge construction rather than passive information delivery.1

### **I.A. The Foundational Pedagogy: Inquiry-Based Learning and Adaptive Feedback**

The core educational philosophy driving this project is Inquiry-Based Learning (IBL), augmented by real-time adaptive feedback. Dynamic content, defined in physics as the study of forces and their resulting effect on motion, requires the platform to move beyond static problem-solving.2 The environment must simulate the continuous evolution of a system's variables over time, where a student’s input immediately and predictably alters the observed motion.3 This implementation necessitates modeling the fundamental differential relationship between net force and acceleration, visually demonstrating Newton’s Second Law, $\\Sigma \\mathbf{F} \= m\\mathbf{a}$, in a continuous time domain.

For the platform to be successful, the interactive labs must prioritize a high degree of student autonomy, encouraging exploration and discovery, a methodology strongly supported by research into effective simulation use.4 Furthermore, the instructional design must ensure that all student learning outcomes are explicit, limited in scope, achievable within the expected course time, and measurable, which is critical for both student comprehension and the effective functioning of the AI evaluation system.6

The simulation architecture must account for the computational constraints inherent in dynamic modeling. Implementing performance optimization is mandatory, specifically configuring the system to automatically pause redrawing the 2D canvas whenever the underlying simulation engine is halted.7 This prevents unnecessary resource expenditure and ensures performance, but it dictates the User Experience (UX), requiring explicit controls like Pause, Play, and Step-Forward to manage the system state in discrete time intervals.8

The resulting blended architecture integrates two distinct, critical components: a **Dynamic Simulation Tool** on the React Canvas, which serves as the environment for physical interaction and model construction, and a **Cognitive Scaffolding Agent** (the LLM Chat), which utilizes the local inference model to provide personalized, real-time guidance.9 This adaptability allows the LLM to address unique learning trajectories and correct misconceptions as they arise, significantly enhancing the learning experience compared to traditional, static methods.10

### **I.B. Target Curriculum Alignment: AP Physics 1 Standard**

To ensure structural rigor and wide applicability, the curriculum should align with the Advanced Placement (AP) Physics 1 framework. This standard provides a logically sequenced, algebra-based introduction to mechanics suitable for high school or introductory college students.11 The curriculum focuses explicitly on four critical units related to translational dynamics, which are ideally suited for the initial 2D canvas implementation.

The sequencing begins with Kinematics (Unit 1), which typically accounts for $10\\%$–$15\\%$ of the course emphasis, establishing the language of motion (speed, velocity, and acceleration) and vector analysis.12 This foundation is essential, as conceptual failure in kinematics often leads to errors in force analysis. The system progresses to Force and Translational Dynamics (Unit 2), the application of Newton’s Laws, which comprises $18\\%$–$23\\%$ of the course content.12 Although outside the strict definition of "Forces and Motion," Work, Energy, and Power (Unit 3, $18\\%$–$23\\%$ weight) is conceptually inseparable from dynamics, focusing on energy transformation and conservation.12 Finally, Linear Momentum (Unit 4, $10\\%$–$15\\%$ weight) addresses impulse and the conservation of momentum in collision scenarios.12

The design of the current 2D engine, focused on translational dynamics, should be constructed with future scalability in mind. The AP Physics 1 curriculum extends to Torque and Rotational Dynamics (Units 5 and 6).11 Since many foundational physics simulators are built to handle rigid bodies and rotational concepts 3, the initial definition of state variables and the choice of numerical integration methods must anticipate the later incorporation of angular momentum and rotational mechanics to maintain architectural consistency.

The specific, measurable learning objectives (MLOs) drawn from the AP framework are essential for priming the LLM's assessment capabilities. Clear goals enable the LLM (as the Verifier agent) to accurately check the student’s understanding and determine appropriate scaffolding questions.15

Table 1 outlines the core content units and their corresponding MLOs, providing the necessary knowledge architecture for content delivery and assessment in the initial module phase.

Table 1: AP Physics 1 Alignment and Learning Objectives for Forces and Motion

| Unit | Focus Area | Key Concepts | Measurable Learning Objectives (MLOs) |
| :---- | :---- | :---- | :---- |
| Unit 1 | Kinematics | Scalars, Vectors, Position, Velocity, Acceleration, Graphical Analysis (1D/2D) | Relate displacement, velocity, and acceleration vectors graphically; Translate between $x-t$, $v-t$, and $a-t$ graphs.14 |
| Unit 2 | Translational Dynamics | Newton’s Three Laws, Free-Body Diagrams, Contact Forces (Friction, Normal, Tension) | Construct accurate Free-Body Diagrams; Calculate net force and resulting acceleration using $\\Sigma \\mathbf{F} \= m\\mathbf{a}$.17 |
| Unit 3 | Work, Energy, Power | Kinetic Energy, Work done by variable forces, Conservation of Mechanical Energy | Apply the Work-Energy Theorem; Identify scenarios where mechanical energy is conserved vs. transformed (e.g., due to friction).13 |
| Unit 4 | Linear Momentum | Momentum ($\\mathbf{p}$), Impulse ($\\mathbf{J}$), Conservation of Momentum (1D/2D), Collisions | Calculate impulse and momentum changes; Verify the conservation of vector momentum in 2D collisions (elastic and inelastic).18 |

## **II. Foundational Curriculum Map: Forces and Translational Dynamics**

The construction of the educational content must be sequential and conceptually rigorous, ensuring that students develop a logical understanding of causality within mechanical systems. This structure forms the explicit knowledge base that the gpt-oss 20b model will reference when engaging in dialogue and providing corrections.

### **II.A. Unit 1: Kinematics and Vector Analysis**

Kinematics must serve as the prerequisite module, establishing the fundamental vocabulary and mathematical tools for describing motion. Key content modules must cover the distinction between scalars and vectors, and the calculation of $x$ and $y$ components for position, velocity, and acceleration. Students are expected to master graphical translation—interpreting and generating $x-t$, $v-t$, and $a-t$ graphs—which is critical for understanding the time evolution of movement.16

Kinematics represents the necessary precursor to force analysis. Dynamics (Unit 2\) relies entirely on calculating acceleration ($\\mathbf{a}$), which is the primary response variable to a net force.13 If a student cannot accurately relate a change in velocity to an acceleration vector, they cannot correctly analyze the forces causing that acceleration. Consequently, the LLM must be specifically programmed to identify conceptual errors related to kinematic variables (e.g., confusing the slope of a position-time graph with acceleration) and adapt the dialogue, pivoting back to Unit 1 concepts until the foundational understanding is secured.9 This adaptive mechanism is vital for ensuring students struggling with prerequisites receive the necessary focused support.10

### **II.B. Unit 2: Force and Translational Dynamics**

This unit is dedicated to applying Newton's laws, starting with the identification and representation of forces. Required content modules include learning to identify and correctly draw all relevant forces acting on an object: gravitational force, normal force, tension, applied force, and the two types of friction (static and kinetic).13 The analysis must also cover action-reaction force pairs as described by Newton's Third Law.20 A critical conceptual exercise involves analyzing motion in non-inertial reference frames, such as the simulated weight changes experienced in the *Elevator Ride* interactive.16

A particularly challenging area for instruction is the nuanced deconstruction of frictional force. Static friction ($\\mathbf{F}\_s$) is an adaptive force that matches the applied force up to a maximum threshold, determined by the static coefficient of friction ($\\mu\_s$) and the normal force ($N$). Once motion begins, the force switches to kinetic friction ($\\mathbf{F}\_k$), which is typically constant and defined by $\\mu\_k N$.13 To correctly model this physical behavior, the simulation (Prototype 2, detailed below) must allow the user to input separate values for $\\mu\_s$ and $\\mu\_k$. Crucially, the system must visually display the actual magnitude of the frictional force applied at any moment, explicitly demonstrating that $\\mathbf{F}\_s$ adjusts itself until the maximum $\\mu\_s N$ is exceeded. This active visualization addresses a major student misconception and grounds the abstract concept of an adaptive force in observable data.

### **II.C. Unit 4: Linear Momentum and 2D Collisions**

The conservation laws introduce a different framework for analyzing interactions. Linear Momentum focuses on the concept of momentum ($\\mathbf{p} \= m\\mathbf{v}$) and impulse ($\\mathbf{J} \= \\Delta \\mathbf{p}$), culminating in the application of the conservation of momentum in both one and two dimensions.14 The concept of elasticity, quantified by the coefficient of restitution ($e$), is introduced here to bridge the connection between momentum conservation and the conservation of kinetic energy ($K$).18

A key instructional challenge in this unit is reinforcing that momentum conservation ($\\Sigma \\mathbf{p}\_i \= \\Sigma \\mathbf{p}\_f$) is a vector equation, especially when extending to 2D collisions.19 Conservation must hold independently along the $x$-axis ($\\Sigma p\_{ix} \= \\Sigma p\_{fx}$) and the $y$-axis ($\\Sigma p\_{iy} \= \\Sigma p\_{fy}$). If students only check the scalar magnitude of total momentum, they overlook the vectorial nature of the law. The 2D Collision Lab (Prototype 3\) must be designed to mitigate this error by providing dedicated displays for momentum along the $x$ and $y$ components or vector graphs of momentum, thus compelling students to verify conservation vectorially.8 This is essential for students engaging with more complex glancing angle collisions.

## **III. The Dynamic Simulation Design Framework (React Canvas)**

The 2D React canvas provides the computational environment for the dynamic content. Designing this system requires treating the canvas as a true physics engine, which necessitates a specific mathematical and programming approach.

### **III.A. Simulation Modeling and Numerical Integration**

A functional physics simulation does not rely on simple algebraic calculation but must solve a set of differential equations that describe how the system variables evolve over continuous time.3 The foundation of this engine is Newton's Second Law, which relates the change in velocity to the net force:

$$\\frac{d\\mathbf{v}}{dt} \= \\mathbf{a} \= \\frac{\\Sigma \\mathbf{F}}{m}$$  
To compute the system state at discrete time steps ($\\Delta t$), a robust numerical integrator, such as the 4th-order Runge-Kutta method, is highly recommended. This method iteratively calculates the new position ($\\mathbf{r}$) and velocity ($\\mathbf{v}$) of every simulated object based on the forces acting upon it.

The simulation's integrity depends on a rigid classification of variables:

1. **Input Variables:** Parameters manipulated by the user via the Graphical User Interface (GUI), such as Mass ($m$), Applied Force ($\\mathbf{F}\_a$), Elasticity ($e$), and the Friction Coefficients ($\\mu\_s, \\mu\_k$).3  
2. **State Variables:** The fundamental variables that define the system's condition at any given time, primarily Position ($\\mathbf{r}$) and Velocity ($\\mathbf{v}$).3  
3. **Calculated/Output Variables:** Quantities derived directly from the state and input variables, which are displayed to the user as feedback (e.g., Acceleration ($\\mathbf{a}$), Net Force ($\\mathbf{F}\_{\\text{net}}$), Momentum ($\\mathbf{p}$), and Kinetic Energy ($K$)).3

Maintaining data consistency between the user's algebraic calculations and the simulation's observed reality is paramount for successful LLM integration. The LLM must verify a student's predicted outcome against the system's actual, numerically solved state. If a student predicts an acceleration of $a \= 2.0 \\, \\text{m/s}^2$ based on their algebraic model, but the simulation, accounting for minor damping or friction, generates $a \= 1.95 \\, \\text{m/s}^2$, the LLM must be equipped to handle this discrepancy. This necessitates that the state payload transmitted to the LLM includes the raw, calculated values of $\\mathbf{F}\_{\\text{net}}$ and $\\mathbf{a}$ directly from the simulation kernel, along with the user's input parameters, providing a comprehensive data stream for verification.

Table 2 formalizes the mathematical modeling by specifying the variables and the governing equations for the dynamic labs, serving as a technical blueprint for the physics programmer developing the React canvas engine.

Table 2: Core Variables and Mathematical Mapping for Dynamic Labs

| Variable Type | Variable (Symbol) | Description | Governing Equations/Mapping |
| :---- | :---- | :---- | :---- |
| Input | Mass ($m$) | Scalar property of the object (kg). | $m$ (User-defined parameter). |
| Input | Applied Force ($\\mathbf{F}\_a$) | Vector force exerted by the user (N). | User-defined vector input (magnitude and direction). |
| Input | Elasticity ($e$) | Coefficient of restitution (Unit 4 only). | $e \= 0$ (Inelastic) to $e=1$ (Elastic).18 |
| State | Position ($\\mathbf{r} \= x\\mathbf{i} \+ y\\mathbf{j}$) | Vector defining object location (m). | Calculated via numerical integration of $\\mathbf{v}$. |
| State | Velocity ($\\mathbf{v} \= v\_x\\mathbf{i} \+ v\_y\\mathbf{j}$) | Vector defining object speed and direction (m/s). | Calculated via numerical integration of $\\mathbf{a}$. |
| Output | Net Force ($\\Sigma \\mathbf{F}$) | Vector sum of all forces (N). | $\\Sigma \\mathbf{F} \= \\mathbf{F}\_a \+ \\mathbf{F}\_g \+ \\mathbf{F}\_N \+ \\mathbf{F}\_f$ (Vector sum). |
| Output | Acceleration ($\\mathbf{a}$) | Vector rate of change of velocity (m/s$^2$). | $\\mathbf{a} \= \\Sigma \\mathbf{F} / m$ (Calculated by engine).2 |
| Output | Kinetic Energy ($K$) | Scalar energy due to motion (J). | $K \= \\frac{1}{2} m v^2$. |
| Output | Momentum ($\\mathbf{p}$) | Vector quantity of mass in motion (kg$\\cdot$m/s). | $\\mathbf{p} \= m\\mathbf{v}$. |

### **III.B. Key Simulation Design Features**

Effective use of the dynamic canvas requires dedicated interface features that enable students to monitor, manipulate, and analyze the system state precisely.

* **Vector Display Overlay:** To encourage students to develop the skill of creating representations of physical phenomena 11, the canvas must include togglable visual overlays. These overlays should represent the velocity vector ($\\mathbf{v}$), the acceleration vector ($\\mathbf{a}$), and, critically, the Net Force vector ($\\mathbf{F}\_{\\text{net}}$). The ability to visualize these vectors alongside the free-body diagram encourages immediate conceptual correlation.  
* **Time Control Mechanisms:** Essential controls—Play, Pause, and Reset—are necessary for managing the experiment.8 The inclusion of a Step-Forward function, which advances the simulation by a single time step ($\\Delta t$), is crucial for students analyzing complex interactions or validating numerical solutions at specific moments.  
* **Zoom and Navigation:** The React canvas must support flexible visualization tools, including the ability to pan and zoom.7 A "zoom to fit" function ensures all nodes/objects are viewable, while high-level zoom allows for precise reading of data points or vector lengths, supporting the detailed analysis required in quantitative lab work.  
* **Data Logging and Graphing:** To facilitate quantitative lab activities, the simulation must be able to log State and Output variables over time. This raw data logging allows students to generate customized graphs (e.g., $a$ vs. $1/m$, or $p\_x$ vs. time) within the application or via export, fulfilling the objective of gathering and analyzing data as part of the scientific method.13

## **IV. Detailed Interactive Lab Prototypes (Dynamic Content Specifications)**

The following three prototypes are designed to cover the core MLOs in Kinematics, Dynamics, and Conservation Laws, transitioning from simple graphical interpretation to complex 2D vector analysis.

### **IV.A. Prototype 1: Kinematic Graphing and Matching**

This lab focuses on building conceptual fluency in kinematics by requiring students to relate 2D motion to its graphical derivatives.

The primary mechanism is a draggable particle whose initial conditions (position $\\mathbf{r}\_0$, velocity $\\mathbf{v}\_0$, and acceleration $\\mathbf{a}$) can be explicitly set by the student. The simulation must allow gravity ($\\mathbf{a}\_y \= \-g$) to be a toggleable option. The key activity involves students attempting to match an animated trajectory to a target set of corresponding $x-t$ and $v-t$ graphs.16

The LLM plays a crucial scaffolding role here. When a student submits their attempted initial conditions, the LLM receives both the student's input (e.g., $v\_{0x}=4.5 \\, \\text{m/s}, a\_x=0$) and the actual conditions required to match the target graph (e.g., $v\_{0x}=5.0 \\, \\text{m/s}, a\_x=0$). If the student's input is quantitatively close but incorrect, the LLM initiates a conceptual dialogue instead of giving the answer. For example, if the student incorrectly identifies the required acceleration, the LLM might prompt: "Your velocity components are quantitatively close. However, please analyze the curvature of the $x-t$ graph again. Does the required slope change in that graph suggest a non-zero acceleration, or does your current zero acceleration profile match the requirement?" This forces the student to connect the mathematical model (acceleration) to the visual representation (graph curvature).

### **IV.B. Prototype 2: Newton’s Second Law and Variable Friction**

This lab is designed to empirically verify the relationship $\\Sigma \\mathbf{F} \= m\\mathbf{a}$ while exploring the complexity of friction.

The mechanism uses a simple object (e.g., a crate or refrigerator, similar to effective conceptual simulations 23) where the user can control the object’s mass ($m$), apply a force ($\\mathbf{F}\_a$ via a drag vector), and set the static ($\\mu\_s$) and kinetic ($\\mu\_k$) coefficients of friction. The real-time display of $\\mathbf{F}\_{\\text{net}}$ and $\\mathbf{a}$ is essential.23

The primary activity design involves two key experimental designs:

1. **Mass-Acceleration Relationship:** The student applies a constant net force, systematically varies the object's mass ($m$), and records the resulting acceleration ($a$). This recorded data is then used to plot $a$ versus $1/m$, confirming the inverse relationship defined by Newton’s Second Law.  
2. **Friction Threshold:** The student gradually increases the applied force ($\\mathbf{F}\_a$). The system shows that the opposing static friction force ($\\mathbf{F}\_s$) increases correspondingly, keeping the object static, until the threshold $\\mathbf{F}\_a \> \\mu\_s N$ is crossed. Once in motion, the object switches to kinetic friction ($\\mathbf{F}\_k$), and the student observes the resulting constant acceleration.

A valuable extension to this prototype involves implementing an **Atwood’s Machine setup**.16 This canonical constrained system simplifies dynamics to a 1D problem dependent only on tension and gravity, providing a critical exercise in force analysis. The canvas should allow students to vary the two hanging masses ($m\_1, m\_2$) connected by a string over a pulley. The student can use the observed acceleration to verify the theoretical derivation $\\mathbf{a} \= \\frac{(m\_2 \- m\_1)g}{m\_1+m\_2}$, linking component forces (gravity and tension) to the acceleration of the entire system.

### **IV.C. Prototype 3: Two-Dimensional Collision Lab**

This lab is focused on the conservation laws and their application in vector space.

The mechanism is a 2D environment featuring two adjustable masses ($m\_1, m\_2$) that can be assigned independent initial velocity vectors.18 Crucially, the system-wide elasticity ($e$) must be controllable, ranging from $e=0$ (perfectly inelastic) to $e=1$ (perfectly elastic).8

The system must prominently display the calculated total momentum vector ($\\Sigma \\mathbf{p}$) and the total kinetic energy scalar ($\\Sigma K$) both before and immediately after the collision event.8

The essential lab activities include:

1. **Elastic Collision Analysis ($e=1$):** The student verifies that both vector momentum ($\\Sigma \\mathbf{p}$) and kinetic energy ($\\Sigma K$) are conserved. This must include 2D glancing collisions, requiring verification of $p\_x$ and $p\_y$ components separately.19  
2. **Inelastic Collision Analysis ($e=0$):** The student observes that the objects stick together (moving with a common final velocity) and verifies that, while $\\Sigma K$ is minimized (or lost to non-conservative forces), the total vector momentum ($\\Sigma \\mathbf{p}$) remains conserved.  
3. **Explosion Scenario:** The activity requires the student to set both initial velocities to zero ($\\mathbf{v}\_{1i} \= \\mathbf{v}\_{2i} \= 0$). By initiating an internal "explosion" force (simulated, for instance, by a spring release), the student observes the resultant final momentum vectors ($\\mathbf{p}\_{1f}$ and $\\mathbf{p}\_{2f}$) and verifies that $\\mathbf{p}\_{1f} \= \-\\mathbf{p}\_{2f}$, confirming that momentum conservation applies equally to reversed interactions.8

## **V. Advanced LLM Integration: The Socratic Tutoring Module**

Integrating the local gpt-oss 20b model requires sophisticated role engineering to transform it from a general language model into a specialized pedagogical agent. Its function must be restricted to verifying student reasoning and providing targeted, Socratic feedback, which is known to generate substantial learning gains in physics.1

### **V.A. Role Engineering the gpt-oss 20b Model**

The primary role of the LLM is to act as a **Verifier/Socratic Instructor**.24 This requires precise instructional guardrails to prevent the model from defaulting to its innate tendency of providing direct, complete solutions.25

The single most critical constraint instruction is: *"Under no circumstances provide the final numerical answer or the complete algebraic solution step-by-step. If a student requests the final answer, or if the student gets stuck, redirect the conversation by asking a foundational conceptual question related to the immediate point of failure."* This rule preserves the cognitive load necessary for learning and forces the student into active reflection.24

The LLM’s problem-solving dialogue must be structured into a sequence of steps, which mirrors successful intelligent tutoring systems in physics 15:

1. **Conceptualization:** The agent asks questions to check the student's initial understanding of the physics laws and assumptions applicable to the scenario (e.g., "Identify all forces acting on the object," or "Is momentum conserved in this specific type of collision?").  
2. **Modeling/Representation:** The agent checks the student's representation of the system, such as variable assignment and diagrammatic representation (e.g., "Show your Free-Body Diagram and coordinate system choice").  
3. **Formalism/Setup:** The agent verifies the correct application of governing equations (e.g., "Write Newton's Second Law for the $x$-component of motion").  
4. **Execution/Interpretation:** The agent checks the student's mathematical calculation and the subsequent comparison of their predicted result against the simulation data.

This structured approach, facilitated by precise prompt engineering, enables educators to define the pedagogical behavior of the LLM effectively.24

### **V.B. Dynamic Context Injection and Adaptive Feedback**

The effectiveness of the LLM as an adaptive tutor is directly proportional to the quality and timeliness of the context it receives from the simulation.9 Real-time adaptability requires a continuous stream of structured data defining the experiment's state. The React canvas must be configured to transmit a standardized JSON payload to the local proxy at every key interaction (user parameter change, simulation pause, or collision event).

This context payload is the mechanism by which the LLM grounds its abstract knowledge in the student’s specific empirical observations.

An example of the required data structure would include:  
{"unit": "Dynamics", "lab\_state": "Running", "user\_input": {"mass\_A": 5.0, "F\_applied": 20.0, "mu\_k": 0.2}, "student\_prediction": {"acceleration": 3.2}, "system\_output": {"F\_net": 10.2, "acceleration": 2.04}}  
To enhance the reliability of the gpt-oss 20b model, particularly given its size relative to state-of-the-art closed-source models, structured internal reasoning must be enforced through prompt engineering strategies like **Tree-of-Thought (ToT)**.27 The LLM must be instructed to use a depth-first search algorithm when evaluating a student's answer. It first searches for the correct underlying formula, then checks the variable assignments, and finally the mathematical steps.27 If an error is detected at any level (e.g., variable assignment), the solution search terminates immediately, and a Socratic question tailored to that specific point of failure is generated.

Furthermore, **Inductive Reasoning Prompts** should be integrated to guide the student from their specific lab observations to the general physical principles.28 For example, after observing an inelastic collision in Prototype 3 where total kinetic energy decreased, the LLM could prompt: "Based on the fact that the total kinetic energy decreased when you set the elasticity $e=0$, what general conclusion can we draw about the conservation of mechanical energy during highly inelastic interactions?"

### **V.C. LLM Limitations and Mitigation**

It is critical to acknowledge the current limitations of Large Language Models in scientific tasks. Evidence suggests that even advanced models struggle significantly with complex multi-step conceptual reasoning, global problem planning, and discovering structure in novel physics scenarios that move beyond textbook exercises.29 They often fail at reasoning tasks that require connecting physical laws, approximation, and establishing stable intermediate representations (like a coherent set of assumptions) across multiple steps.29

Therefore, the system’s design must strictly restrict the LLM’s role to verifying solutions and providing personalized coaching within the boundaries of the pre-validated curriculum.26 It should not be tasked with generating original simulation content or solving complex, research-level problems. Its primary utility is the capacity to predict student outcomes and iteratively improve the instructional materials by simulating expert judgment, provided clear instructional prompts are used.30

Mitigation strategies include implementing a robust logging system to capture and audit all LLM-student conversations. This human oversight ensures content fidelity and rapidly identifies instances of occasional inaccuracies, which can occur even with sophisticated role engineering.24

Table 3 provides a conceptual template for engineering the prompt structure required to maintain the Socratic, non-solution-giving behavior of the gpt-oss 20b model.

Table 3: Prompt Engineering Template for LLM Socratic Dialogue

| Component | Instruction/Constraint | Purpose |
| :---- | :---- | :---- |
| **System Role** | "You are an expert Physics Instructor utilizing the Socratic method. Your goal is to guide students to the correct solution by asking targeted questions, not by giving the answer." | Defines Persona and Guardrails.24 |
| **Output Constraint** | "DO NOT provide final numerical answers or complete algebraic steps. If the student asks for the answer, respond with a conceptually probing question related to the most recent incorrect step." | Enforces non-solution delivery.25 |
| **Context Payload** | "Receive and interpret the JSON object detailing the student's inputs and the current simulation state (e.g., F\_net, acceleration, collision data)." | Enables adaptive, real-time feedback.9 |
| **Reasoning Strategy** | "Employ a Tree-of-Thought (ToT) approach for evaluation: 1\. Identify the student's goal. 2\. Verify conceptual law application. 3\. Check equation setup. 4\. Verify calculation. If an error is found at step N, stop and generate a prompt for step N." | Ensures reliable, structured verification.27 |
| **Socratic Template** | "If conceptual error: Use Inductive Reasoning: 'Based on the observation that \[simulation output\], what fundamental law must be conserved here?'" | Provides actionable, targeted instruction.28 |

## **VI. Implementation Roadmap and Future Directions**

A phased deployment strategy is essential to manage technical complexity and ensure pedagogical content validation before scaling.

### **VI.A. Phased Deployment Strategy**

| Phase | Duration | Scope | Key Deliverables |
| :---- | :---- | :---- | :---- |
| **P1: Kinematics Minimum Viable Product (MVP)** | 4 Weeks | Core 2D canvas initialization, Kinematics Prototype 1\. | Working particle trajectory simulation; Basic graphing of $x-t$ and $v-t$; Initial LLM proxy integration for definition recall and basic 1D equation checks. |
| **P2: Dynamics Core** | 6 Weeks | Dynamics Prototype 2 (Force/Friction); Full 2D vector calculation. | Implementation of the $\\Sigma \\mathbf{F}=m\\mathbf{a}$ differential engine; FBD display overlay; LLM integration for Socratic dialogue Steps 1-3 (Conceptualization, Modeling, Formalism). |
| **P3: Conservation & V1.0 Launch** | 8 Weeks | Momentum Prototype 3 (2D Collisions); Work/Energy concepts (Unit 3). | Elasticity control implementation; Dedicated conservation law verification displays (vector momentum and scalar kinetic energy); Full LLM integration for execution verification (Step 4\) and adaptive pathway generation. |

### **VI.B. Adaptive Learning and Expert Validation**

The platform’s long-term effectiveness hinges on its ability to leverage the LLM for genuine adaptive learning pathways, which tailor instruction to individual student weaknesses.9 The LLM's function as an evaluator is used to optimize the instructional delivery.30 For instance, if the Verifier agent consistently flags a student's struggle with drawing and interpreting Free-Body Diagrams (a Unit 2 concept), the adaptive pathway should automatically trigger a mandatory, targeted review module focused on vector decomposition and force identification before allowing the student to attempt the quantitative Atwood’s Machine problem.

Ongoing curriculum validation must incorporate human expertise. While the LLM can simulate expert pedagogical assessment 30, it remains necessary to maintain human oversight to address the LLM’s potential for occasional inaccuracies.24 A rigorous data collection strategy must be in place to log and audit conversation quality and student performance.

Future advancements should plan for multimodal integration. Although the gpt-oss 20b model may currently be limited, next-generation LLMs offer the potential to analyze visual representations, such as a student's hand-drawn Free-Body Diagram, and provide feedback based on notational rules stored in a knowledge file.24 This multimodal capability represents a significant enhancement to the tutoring experience, moving beyond purely text-based interactions.

## **VII. Conclusions and Recommendations**

The transition of the current project skeleton into an expert-level dynamic learning environment hinges on the synchronous development of three key systems: a high-fidelity numerical physics engine (React Canvas), a standards-aligned curriculum structured around Kinematics, Dynamics, and Momentum, and a rigidly role-engineered LLM Socratic tutor (gpt-oss 20b).

**Key Conclusions:**

1. **Dynamic Content Requirement:** Achieving truly dynamic content demands the implementation of a numerical integration method (e.g., Runge-Kutta) within the React canvas to model the differential relationship $\\frac{d\\mathbf{v}}{dt} \= \\Sigma \\mathbf{F} / m$. This capability is non-negotiable for simulating phenomena like friction thresholds and continuous acceleration.2  
2. **Pedagogical Sequencing:** The curriculum must follow the established AP Physics 1 sequence, beginning with Kinematics mastery as a prerequisite for Dynamics. Instructional design must explicitly focus on the vectorial nature of momentum conservation in 2D collisions and the distinction between static and kinetic friction to address common conceptual pitfalls.17  
3. **LLM as Verifier, Not Solver:** The gpt-oss 20b model must be primarily role-engineered as a Socratic Verifier, utilizing precise prompt instructions (guardrails) to prevent it from providing direct answers.24 Its pedagogical dialogue must be strictly structured across four phases: Conceptualization, Modeling, Formalism, and Execution.15  
4. **Data Payload is Causal:** The efficacy of the LLM's adaptive feedback relies entirely on the continuous injection of the simulation's state data (Input, State, and Output variables) into the chat context. This dynamic context payload is the mechanism that facilitates real-time adaptability and grounds the Socratic dialogue in the student’s specific empirical observations.9

**Recommendations for Next Steps:**

1. **Prioritize Physics Engine Implementation:** Immediately focus resources on building the Runge-Kutta kernel and defining the structured variable hierarchy (Table 2). The data integrity of the simulation dictates the viability of the LLM.  
2. **Develop LLM Context API:** Define the precise JSON format for the simulation context injection. This standard must be rigidly maintained across all lab prototypes to ensure the LLM proxy can consistently interpret the system state.  
3. **Refine Socratic Prompts:** Dedicate engineering time to testing and refining the specific prompt templates (Table 3), using the Tree-of-Thought approach to maximize the gpt-oss 20b model's reliability in verifying conceptual and algebraic steps before student deployment.27
