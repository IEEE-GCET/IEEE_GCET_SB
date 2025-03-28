// import { required } from "joi";
import { required } from "joi";
import mongoose from "mongoose";

const Schema = mongoose.Schema;

const eventFormSchema = new mongoose.Schema(
  {
    title: {
      type: String
    },
    organizedBy: [
      {
        type: Schema.Types.ObjectId,
        ref: "Society",
      },
    ],
    dignitaries: {
      guests: [{
        name: {
          type: String,
        },
        designation: {
          type: String,
        },
        description: {
          type: String,
        },
      }],
      resource_person: [{
        name: {
          type: String,
        },
        designation: {
          type: String,
        },
        description: {
          type: String,
        },
      }],
    },
    coordinators: {
      faculty: [
        {
          name: {
            type: String,
          },
          dept: {
            type: String,
            enum: ["CSE", "IT", "ECE", "EEE", "MECH", "CIVIL"],
          },
          designation: {
            type: String,
          },
        },
      ],
      students: [
        {
          name: {
            type: String,
          },
          dept: {
            type: String,
            enum: ["CSE", "IT", "ECE", "EEE", "MECH", "CIVIL"],
          },
          year: {
            type: String,
            enum: ["1", "2", "3", "4"],
          },
        },
      ],
    },
    affiliations: [
      {
        organization: {
          type: String,
        },
        sponsership: {
          type: Boolean,
          default: false,
        },
      },
    ],
    collaborated_societies: [
      {
        type: Schema.Types.ObjectId,
        ref: "Society",
        default: null,
      },
    ],
    venue: {
      type: String,

    },
    description: {
      introduction: {
        type: String,

      },
      section: [{
        title: {
          type: String,

        },
        context: {
          type: String,

        }
        , sub_section: [
          {
            title: {
              type: String,

            },
            context: {
              type: String,

            },
            sub_images: [{
              public_id: {
                type: String,
              },
              caption: {
                type: String
              },
              link: {
                type: String,
              },
              dirty: {
                type: Boolean,
                default: true,
              },
              file_name: {
                type: String
              }
            }], // Image array
          },
        ]
      }],
      conclusion: {
        type: String,
      },
    },
    images: {
      cover: {
        type: String,
        // 
      },
      gallery: [{
        title: {
          type: String,
        },
        caption: {
          type: String
        },
        link: {
          type: String,
        }
      }],
    },
    winners: [{
      title: String,
      position: {
        type: String,
        enum: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
      },
      participants: [{
        name: {
          type: String,
        },
        dept: {
          type: String,
          enum: ["CSE", "IT", "ECE", "EEE", "MECH", "CIVIL"],
        },
        year: {
          type: String,
          enum: ["1", "2", "3", "4"],
        }
      }]
    }],
    collaboration: {
      type: Boolean,
      default: false,
    },
    documents: {
      name: {
        type: String,
      }, description: {
        type: String,
      },
      link: {
        type: String,
      },
    },
    editedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    uploadedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    }
  },
  { timestamps: true }
);
export const EventForm = mongoose.model("Event", eventFormSchema);
