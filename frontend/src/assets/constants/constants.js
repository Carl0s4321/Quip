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
      name: "Ben Dover",
      designation: "Global Leadership Director at xyz Company",
      image: "https://t3.ftcdn.net/jpg/02/22/85/16/360_F_222851624_jfoMGbJxwRi5AWGdPgXKSABMnzCQo9RN.jpg",
    },
    {
      testimonial:
        "Whether someone is in the office, working from home, or working on-site with a client, everyone can share context and information through Quip.",
      name: "John Doe",
      designation: "Product Manager at 123 Corp.",
      image: "https://st2.depositphotos.com/3776273/44464/i/450/depositphotos_444643918-stock-photo-close-up-of-handsome-confident.jpg",
    },
    {
      testimonial:
        "We used Quip to provide clarity on steps, requirements, and procedures. This was exceptional when communicating with teams that had deep cultural and language differences.",
      name: "Jane Smith",
      designation: "Development Manager at fake company",
      image: "https://www.shutterstock.com/image-photo/business-woman-holding-out-hand-260nw-30893854.jpg",
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