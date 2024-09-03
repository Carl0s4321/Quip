import { folder, megaphone, leaf, checklist, brainstorm, book } from '..'
import { faComment, faFillDrip, faGear } from '@fortawesome/free-solid-svg-icons';

const cards = [
    {
        icon: folder,
        title: "Project Management",
        subtitle: "Keep tasks in order, deadlines on track, and team members aligned with Quip.",
        color: "#FF7452",
    },
    {
        icon: megaphone,
        title: "Meetings",
        subtitle: "Empower your team meetings to be more productive, empowering, and dare we say—fun.",
        color: "#2684FF",
    },
    {
        icon: leaf,
        title: "Onboarding",
        subtitle: "Onboarding to a new company or project is a snap with Quip’s visual layout of to-do’s, resources, and progress tracking.",
        color: "#57d9a3",
    },
    {
        icon: checklist,
        title: "Task management",
        subtitle: "Use Quip to track, manage, complete, and bring tasks together like the pieces of a puzzle, and make your team’s projects a cohesive success every time.",
        color: "#ffc400",
    },
    {
        icon: brainstorm,
        title: "Brainstorming",
        subtitle: "Unleash your team’s creativity and keep ideas visible, collaborative, and actionable.",
        color: "#00c7e5",
    },
    {
        icon: book,
        title: "Resource hub",
        subtitle: "Save time with a well-designed hub that helps teams find information easily and quickly.",
        color: "#f99cdb",
    },
]

const testimonials = [
    {
      testimonial:
        "[Quip is] great for simplifying complex processes. As a manager, I can chunk [processes] down into bite-sized pieces for my team and then delegate that out, but still keep a bird's-eye view.",
      name: "Joey Rosenberg",
      designation: "Global Leadership Director at Women Who Code",
      image: "https://media.licdn.com/dms/image/D5603AQGnMWg-dv9v5Q/profile-displayphoto-shrink_200_200/0/1694041555679?e=2147483647&v=beta&t=Yk_xFQUyMj6J3L7y6Q5ThBDqR-U42AUFaptFRegu_vI",
    },
    {
      testimonial:
        "Whether someone is in the office, working from home, or working on-site with a client, everyone can share context and information through Quip.",
      name: "Sumeet Moghe",
      designation: "Product Manager at ThoughtWorks",
      image: "https://media.licdn.com/dms/image/D4D03AQHD9FsarLL10Q/profile-displayphoto-shrink_200_200/0/1684987179834?e=2147483647&v=beta&t=9-EJOeWY_8NOV8GeVTQqvxPoG9X1f5cKSxDPduFsXFE",
    },
    {
      testimonial:
        "We used Quip to provide clarity on steps, requirements, and procedures. This was exceptional when communicating with teams that had deep cultural and language differences.",
      name: "Jefferson Scomacao",
      designation: "Development Manager at IKEA/PTC",
      image: "https://media.licdn.com/dms/image/D4D03AQEPoyEavd7waw/profile-displayphoto-shrink_200_200/0/1699911829799?e=2147483647&v=beta&t=MeI0gTXLtNEEE1xBwZxCfArJ_SK5wezlX0JKe_juy10",
    },
  ];

  const footers = [
    {
      title:"About Quip",
      subtitle:"What’s behind the boards.",
      link:"#",
    },
    {
      title:"Jobs",
      subtitle:"Learn about open roles on the Quip team.",
      link:"#",
    },
    {
      title:"Apps",
      subtitle:"Download the Quip App for your Desktop or Mobile devices.",
      link:"#",
    },
    {
      title:"Contact us",
      subtitle:"Need anything? Get in touch and we can help.",
      link:"#",
    },
  ];

  const wheelMenuIcons = [
    {
      icon: faComment,
      popupContent: 'message',
      size: { width: '350px', height: '550px' },
    },
    {
      icon: faFillDrip,
      popupContent: 'theme',
      size: { width: '350px', height: '350px' },
    },
    {
      icon: faGear,
      popupContent: 'settings',
      size: { width: '350px', height: '100px' },
    },
  ]

export {
    cards,
    testimonials,
    footers,
    wheelMenuIcons,
}