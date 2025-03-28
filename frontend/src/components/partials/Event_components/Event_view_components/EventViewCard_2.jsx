import React from "react";
import EventCoverCard from "./Event_cover_components/EventCoverCard";
import AssociationsCard from "./Event_cover_components/AssociationsCard";
import eventimg3 from "../eventimg3.jpg"; // Ensure this image exists
import DignitariesCard from "./Event_cover_components/DignitariesCard";
import CoordinatorsCard from "./Event_cover_components/CoordinatorsCard";
import IntroConcCard from "./Content_Components/IntroConcCard";
import SectionCard from "./Content_Components/SectionCard";

const eventData2 = {
  message: "Event found successfully",
  success: true,
  data: {
    dignitaries: {
      guests: [
        {
          name: "Dr. Pawan Kumar Jain",
          designation: "Associate Director, ARCI, HYD",
          description:
            "Dr. Pawan Kumar Jain shared valuable insights on 'Advancements in Nanomaterials.' He is passionate about research, mentoring, and innovation, with significant contributions to the field. He has published extensively, collaborates with academia and industry, and recently delivered an inspiring guest lecture, enriching students and researchers alike.",
          _id: "679b69238d951b39fbd3fac5",
        },
      ],
      resource_person: [
        {
          name: "Dr. Satish Kumar Dubey",
          designation: "Associate Professor, BITS PILANI, HYD.",
          description:
            "Dr. Satish Kumar Dubey, Associate Professor at BITS Pilani, Hyderabad, specializes in Nanotechnology. He is passionate about research, mentoring, and innovation, with significant contributions to the field. He has published extensively, collaborates with academia and industry, and recently delivered a welcoming guest lecture, inspiring students and researchers alike.",
          _id: "679b69238d951b39fbd3fac6",
        },
        {
          name: "Mr. G Narayana Rao",
          designation: "Lab Manager, BITS PILANI, HYD.",
          description:
            "Mr. G. Narayana Rao presented on 'Current Advancements in Silicon Device Fabrication and Semiconductors,' covering the latest fabrication techniques, the role of semiconductors in electronics, and innovations shaping Silicon devices. His talk provided valuable insights into the challenges and opportunities in semiconductor technology.",
          _id: "679b69238d951b39fbd3fac7",
        },
      ],
    },
    date: "2025-01-30T06:50:21.625Z",
    coordinators: {
      faculty: [
        {
          name: "Mrs. L Uma Maheswari",
          dept: "ECE",
          designation: "Assistant Professor, GCET",
          _id: "679b69238d951b39fbd3fac8",
        },
      ],
      students: [
        {
          name: "M. Anitha",
          dept: "ECE",
          year: "4",
          _id: "679b69238d951b39fbd3fac9",
        },
        {
          name: "S. Vignesh",
          dept: "ECE",
          year: "4",
          _id: "679b69238d951b39fbd3faca",
        },
        {
          name: "Uday Kumar",
          dept: "ECE",
          year: "4",
          _id: "679b69238d951b39fbd3facb",
        },
        {
          name: "Pranay",
          dept: "ECE",
          year: "4",
          _id: "679b69238d951b39fbd3facc",
        },
        {
          name: "T. Arun Kumar",
          dept: "ECE",
          year: "3",
          _id: "679b69238d951b39fbd3facd",
        },
        {
          name: "R. Tejaswi",
          dept: "ECE",
          year: "3",
          _id: "679b69238d951b39fbd3face",
        },
        {
          name: "D. Pranay",
          dept: "ECE",
          year: "3",
          _id: "679b69238d951b39fbd3facf",
        },
        {
          name: "P V Ravi Kalyan",
          dept: "ECE",
          year: "3",
          _id: "679b69238d951b39fbd3fad0",
        },
        {
          name: "Deepika",
          dept: "ECE",
          year: "3",
          _id: "679b69238d951b39fbd3fad1",
        },
        {
          name: "Y. Pradhyum",
          dept: "ECE",
          year: "3",
          _id: "679b69238d951b39fbd3fad2",
        },
        {
          name: "M. Vikram",
          dept: "ECE",
          year: "3",
          _id: "679b69238d951b39fbd3fad3",
        },
        {
          name: "P. Sai Chaithanya",
          dept: "ECE",
          year: "3",
          _id: "679b69238d951b39fbd3fad4",
        },
        {
          name: "GDD Shanmukha",
          dept: "ECE",
          year: "3",
          _id: "679b69238d951b39fbd3fad5",
        },
        {
          name: "Esther Rani",
          dept: "ECE",
          year: "3",
          _id: "679b69238d951b39fbd3fad6",
        },
        {
          name: "P. Amulya",
          dept: "ECE",
          year: "3",
          _id: "679b69238d951b39fbd3fad7",
        },
        {
          name: "V. Keerthi Sai",
          dept: "ECE",
          year: "3",
          _id: "679b69238d951b39fbd3fad8",
        },
        {
          name: "S. Allen Jason",
          dept: "ECE",
          year: "3",
          _id: "679b69238d951b39fbd3fad9",
        },
        {
          name: "Yashika Agarwal",
          dept: "ECE",
          year: "3",
          _id: "679b69238d951b39fbd3fada",
        },
      ],
    },
    description: {
      introduction:
        "The two-day Symposium on 'Advancements in Nanotechnology' aimed to explore the latest innovations in nanotechnology, featuring expert lectures and discussions. The event brought together industry leaders, researchers, and students to discuss key topics such as nanomaterials, silicon device fabrication, and the future of nanotechnology. With insights from distinguished speakers like Dr. Satish Kumar Dubey and Mr. G. Narayana Rao, the symposium provided a platform for learning and collaboration in the rapidly advancing field of nanotechnology.",
      section: [
        {
          title:
            "Day - 1: Insights into Nanotechnology and Semiconductor Advancements",
          context:
            "Day 1 focused on nanotechnology and semiconductor advancements, featuring expert lectures and discussions on cutting-edge research and applications.",
          sub_section: [
            {
              title: "Address by Dr. Satish Kumar Dubey",
              context:
                "Dr. Satish Kumar Dubey, Associate Professor at BITS Pilani, Hyderabad, addressed the participants, offering an in-depth perspective on the latest advancements in nanotechnology. He emphasized the importance of nanotechnology in modern research, its role in driving technological innovations, and its profound impact on various industries, inspiring the attendees to explore the field further.",
              _id: "679b69238d951b39fbd3fadd",
            },
            {
              title: "Honoring Dr. Satish Kumar Dubey",
              context:
                "In recognition of his valuable guest lecture and significant contributions to the field of nanotechnology, Prof. B. Hari Kumar, Dean of SE&CE, honored Dr. Satish Kumar Dubey. This gesture highlighted the deep respect and appreciation for his expertise and dedication to advancing scientific knowledge and fostering the growth of the next generation of engineers and researchers.",
              _id: "679b69238d951b39fbd3fade",
            },
            {
              title: "Welcoming Mr. G. Narayana Rao",
              context:
                "The guest lecture session for Day 1 continued with a warm welcome to Mr. G. Narayana Rao, Lab Manager at BITS Pilani, Hyderabad, by Amulya P, a volunteer from the ECE Department. Mr. Rao’s expertise in semiconductor technology made him an ideal speaker to provide insights into the ongoing advancements in Silicon device fabrication, particularly in the context of nanotechnology.",
              _id: "679b69238d951b39fbd3fadf",
            },
            {
              title: "Expert Talk on Silicon Device Fabrication",
              context:
                "Mr. G. Narayana Rao delivered an engaging and informative presentation on 'Current Advancements in Silicon Device Fabrication and Semiconductors.' His talk covered the latest techniques in the fabrication of semiconductors, their role in modern electronics, and the rapid innovations driving the evolution of Silicon devices. The session provided attendees with a deeper understanding of the challenges and opportunities in the field.",
              _id: "679b69238d951b39fbd3fae0",
            },
            {
              title: "Honoring Mr. G. Narayana Rao",
              context:
                "Following his insightful guest lecture, Mr. G. Narayana Rao was honored by Prof. O.V.P.R. Siva Kumar, Faculty Advisor for the IEEE NTC Student Branch Chapter. This recognition highlighted the invaluable contributions Mr. Rao has made to the field of nanotechnology and the positive impact of his expertise on the next generation of researchers and engineers.",
              _id: "679b69238d951b39fbd3fae1",
            },
          ],
          _id: "679b69238d951b39fbd3fadc",
        },
        {
          title: "Day 2: Exploring Nanomaterials and Digital Poster Evaluation",
          context:
            "Day 2 of the symposium focused on nanomaterials and the digital poster evaluation segment. Participants had the opportunity to explore the latest advancements in nanomaterials, with a special guest lecture from Dr. Pawan Kumar Jain, Associate Director at ARCI, Hyderabad. The day also included an exciting session where students showcased their research through digital posters, which were evaluated by experts, providing valuable feedback and fostering innovation in nanotechnology.",
          sub_section: [
            {
              title: "Welcoming Dr. Pawan Kumar Jain",
              context:
                "On Day 2, the symposium continued with a warm welcome for Dr. Pawan Kumar Jain, Associate Director at ARCI, Hyderabad, by R. Tejaswi, a volunteer from the ECE Department. Dr. Jain’s extensive experience in nanomaterials research made him an ideal speaker to share cutting-edge advancements and discuss the potential future impact of nanomaterials in various scientific applications.",
              _id: "679b69238d951b39fbd3fae3",
            },
            {
              title: "Guest Lecture on Nanomaterials",
              context:
                "Dr. Pawan Kumar Jain captivated the audience with his guest lecture on 'Advancements in Nanomaterials.' He delved into the recent breakthroughs in nanomaterials, exploring their unique properties, applications in diverse industries, and the significant role they play in fields such as electronics, energy, and medicine. His presentation offered a comprehensive overview of the latest trends and challenges in nanomaterials research.",
              _id: "679b69238d951b39fbd3fae4",
            },
            {
              title: "Digital Poster Evaluation",
              context:
                "Dr. Pawan Kumar Jain and Prof. O.V.P.R. Siva Kumar carefully evaluated the digital posters presented by the participants, assessing the quality, innovation, and relevance of the research topics. The evaluation process provided students with constructive feedback and encouraged them to further refine their ideas, offering valuable opportunities for growth and learning in the field of nanotechnology.",
              _id: "679b69238d951b39fbd3fae5",
            },
            {
              title: "Winner Announcement",
              context:
                "The symposium concluded with the much-anticipated Winner Declaration for the Digital Poster Presentation competition. The winners were recognized for their outstanding contributions, innovative ideas, and in-depth research on cutting-edge topics in nanotechnology. The event not only celebrated the winners but also encouraged all participants to continue exploring and contributing to advancements in the field.",
              _id: "679b69238d951b39fbd3fae6",
            },
          ],
          _id: "679b69238d951b39fbd3fae2",
        },
      ],
      conclusion:
        "The symposium on 'Advancements in Nanotechnology' successfully brought together leading experts, researchers, and students to explore the latest developments in the field. Over two days, participants gained valuable insights through engaging guest lectures on nanomaterials, semiconductor advancements, and digital poster presentations. The event fostered collaboration, innovation, and intellectual growth, encouraging participants to continue exploring the vast potential of nanotechnology. With constructive feedback from esteemed speakers like Dr. Satish Kumar Dubey and Dr. Pawan Kumar Jain, the symposium proved to be an enriching experience, inspiring future breakthroughs in nanotechnology and related scientific domains.",
    },
    images: { gallery: null },
    _id: "679b212d6e4d3d4228239d02",
    title: "Two-Day Symposium on 'Advancements of Nanotechnology'",
    organizedBy: ["679b0fe65dc94eb3a3874b4e"],
    affiliations: [
      {
        organization: "BITS PILANI, HYD",
        sponsership: true,
        _id: "679b69238d951b39fbd3fadb",
      },
    ],
    collaborated_societies: [
      {
        _id: "67927a797cc9b5acbbeddfe0",
        name: "IEEE SB",
        description:
          "IEEE GCET Student Branch (SB) is a vibrant and dynamic chapter at Geethanjali College of Technology and Engineering (GCET), dedicated to fostering innovation,collaboration, and technical excellence among students. As part of the global IEEE network, the student branch empowers young engineers and technologists to explore emerging technologies, develop leadership skills, and engage with a diverse community of like-minded individuals.At IEEE GCET SB, we organize a variety of events, including technical workshops, hackathons, webinars, guest lectures by industry experts, coding competitions, and career guidance sessions. Our mission is to provide a platform for students to enhance their knowledge, contribute to cutting-edge projects, and bridge the gap between academia and industry.With a focus on professional growth and community impact, IEEE GCET SB serves as a hub for aspiring innovators to explore opportunities, build networks, and create meaningful change in the fields of engineering, technology, and beyond.Join us in shaping the future of technology—together, we innovate, inspire, and lead!",
        advisor: "679252b6f8a221a62d4804b7",
        chair: "67925151f8a221a62d4804b3",
        members: ["P V Ravi Kalyan", "T Arun Kumar", "R Tejaswi"],
        creator: "679252b6f8a221a62d4804b7",
        events: ["679b212d6e4d3d4228239d02"],
        latestEvents: null,
        createdAt: "2025-01-23T17:20:57.090Z",
        updatedAt: "2025-01-30T05:46:38.023Z",
        __v: 2,
      },
    ],
    venue: "2nd Floor, IT Seminar Hall, Block - 1, GCET",
    winners: [
      {
        title: "1st Prize",
        participants: [
          {
            name: "D. Pranay",
            dept: "ECE",
            year: "3",
            _id: "679b69238d951b39fbd3fae8",
          },
          {
            name: "R. Tejaswi",
            dept: "ECE",
            year: "3",
            _id: "679b69238d951b39fbd3fae9",
          },
          {
            name: "Anushman",
            dept: "ECE",
            year: "3",
            _id: "679b69238d951b39fbd3faea",
          },
        ],
        _id: "679b69238d951b39fbd3fae7",
      },
      {
        title: "2nd Prize",
        participants: [
          {
            name: "T. Arun Kumar",
            dept: "ECE",
            year: "3",
            _id: "679b69238d951b39fbd3faec",
          },
          {
            name: "P V Ravi Kalyan",
            dept: "ECE",
            year: "3",
            _id: "679b69238d951b39fbd3faed",
          },
          {
            name: "M. Anitha",
            dept: "ECE",
            year: "4",
            _id: "679b69238d951b39fbd3faee",
          },
        ],
        _id: "679b69238d951b39fbd3faeb",
      },
      {
        title: "3rd Prize",
        participants: [
          {
            name: "GDD Shanmukha",
            dept: "ECE",
            year: "3",
            _id: "679b69238d951b39fbd3faf0",
          },
          {
            name: "Uday Kumar",
            dept: "ECE",
            year: "4",
            _id: "679b69238d951b39fbd3faf1",
          },
          {
            name: "S. Allen Jason",
            dept: "ECE",
            year: "2",
            _id: "679b69238d951b39fbd3faf2",
          },
        ],
        _id: "679b69238d951b39fbd3faef",
      },
      {
        title: "Runner up",
        participants: [
          {
            name: "Y. Pradhyum",
            dept: "ECE",
            year: "3",
            _id: "679b69238d951b39fbd3faf4",
          },
          {
            name: "M. Vikram",
            dept: "ECE",
            year: "3",
            _id: "679b69238d951b39fbd3faf5",
          },
          {
            name: "P. Sai Chaithanya",
            dept: "ECE",
            year: "3",
            _id: "679b69238d951b39fbd3faf6",
          },
        ],
        _id: "679b69238d951b39fbd3faf3",
      },
    ],
    collaboration: true,
    editedBy: {
      academics: {
        year: "4",
        dept: "ECE",
        position: "IEEE SB Student Chair",
        experience: 0,
      },
      _id: "679906bc7371193ea16703dc",
      fullname: "Diddi Pranay",
      email: "pranaydiddi250604@gmail.com",
      password: "$2a$15$Jsgt9NREUGufPeNmWU9HH.WwtRRXQLkqYEMHa.iQGusD1jRCZRX3S",
      role: "chair",
      description:
        "Enthusiast towards IEEE GCET SB and wanted to do something good",
      societies_registered: [
        "67927a797cc9b5acbbeddfe0",
        "679b0fe65dc94eb3a3874b4e",
      ],
      events: ["679b212d6e4d3d4228239d02"],
      society_members: [
        "S Jyothirmaye",
        "P V Ravi Kalyan",
        "T Arun Kumar",
        "R Tejaswi",
      ],
      createdAt: "2025-01-28T16:33:00.232Z",
      updatedAt: "2025-01-28T16:33:00.232Z",
      __v: 0,
    },
    uploadedBy: {
      academics: {
        year: "4",
        dept: "ECE",
        position: "IEEE SB Student Chair",
        experience: 0,
      },
      _id: "679906bc7371193ea16703dc",
      fullname: "Diddi Pranay",
      email: "pranaydiddi250604@gmail.com",
      password: "$2a$15$Jsgt9NREUGufPeNmWU9HH.WwtRRXQLkqYEMHa.iQGusD1jRCZRX3S",
      role: "chair",
      description:
        "Enthusiast towards IEEE GCET SB and wanted to do something good",
      societies_registered: [
        "67927a797cc9b5acbbeddfe0",
        "679b0fe65dc94eb3a3874b4e",
      ],
      events: ["679b212d6e4d3d4228239d02"],
      society_members: [
        "S Jyothirmaye",
        "P V Ravi Kalyan",
        "T Arun Kumar",
        "R Tejaswi",
      ],
      createdAt: "2025-01-28T16:33:00.232Z",
      updatedAt: "2025-01-28T16:33:00.232Z",
      __v: 0,
    },
    createdAt: "2025-01-30T06:50:21.625Z",
    updatedAt: "2025-01-30T11:57:23.716Z",
    __v: 1,
  },
};

const EventViewCard_2 = ({ eventData = eventData2 }) => {
  const {
    title,
    date = updatedAt,
    venue,
    image = eventimg3,
    affiliations,
    collaborated_societies,
    dignitaries,
    coordinators,
    description,
  } = eventData?.data || {}; // Safely access eventData and fallback to empty object if it's undefined

  return (
    <div className="mt-16">
      {/* Event Cover Section */}
      {title && date && venue && image && (
        <EventCoverCard
          title={title}
          date={date}
          venue={venue}
          image={image || eventimg3} // Use fallback image if image is missing
        />
      )}

      {/* Affiliations & Societies Section */}
      {(affiliations?.length > 0 || collaborated_societies?.length > 0) && (
        <AssociationsCard
          title="Affiliations & Societies"
          affiliations={affiliations}
          societies={collaborated_societies}
        />
      )}

      {/* Dignitaries Section */}
      {dignitaries && (
        <>
          {/* Guests */}
          {dignitaries.guests?.length > 0 ? (
            <DignitariesCard alldignitaries={{ dignitaries }} title="Guests" />
          ) : (
            dignitaries.guests &&
            dignitaries.guests.length === 0 && (
              <p>No guests available for this event.</p>
            )
          )}
        </>
      )}

      {/* Coordinators Section */}
      {coordinators &&
        (coordinators.faculty?.length > 0 ||
          coordinators.students?.length > 0) && (
          <CoordinatorsCard coordinators={coordinators} />
        )}

      {/* Introduction Section */}
      {description?.introduction && (
        <IntroConcCard  content={description.introduction} title="Introduction" />
      )}

      {/* Sections */}
      {description?.section?.length > 0 && (
        <div>
          {description.section.map((sec, index) => (
            <SectionCard
              key={index}
              title={sec.title}
              context={sec.context}
              subSections={sec.sub_section}
            />
          ))}
        </div>
      )}

      {/* Conclusion Section */}
      {description?.conclusion && (
        <IntroConcCard content={description.conclusion} title="Conclusion" />
      )}
    </div>
  );
};

export default EventViewCard_2;
