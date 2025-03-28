// import { required } from "joi";
import mongoose from "mongoose";

const Schema = mongoose.Schema;

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    organizedBy: [
      {
        type: Schema.Types.ObjectId,
        ref: "Society",
        required: true,
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
            required: true,
          },
          dept: {
            type: String,
            enum: ["CSE", "IT", "ECE", "EEE", "MECH", "CIVIL"],
            required: true,
          },
          designation: {
            type: String,
            required: true,
          },
        },
      ],
      students: [
        {
          name: {
            type: String,
            required: true,
          },
          dept: {
            type: String,
            enum: ["CSE", "IT", "ECE", "EEE", "MECH", "CIVIL"],
            required: true,
          },
          year: {
            type: String,
            enum: ["1", "2", "3", "4"],
            required: true,
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
        img:{
          type: String,
          default: null
        }
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
      required: true,
    },
    description: {
      introduction: {
        type: String,
        required: true,
      },
      section: [{
        title: {
          type: String,
          required: true,
        },
        context: {
          type: String,
          required: true,
        }
        , sub_section: [
          {
            title: {
              type: String,
              required: true,
            },
            context: {
              type: String,
              required: true,
            },
            sub_images: [{
              title: {
                type: String,
              },
              caption:{
                type: String
              },
              link: {
                type: String,
              },
            }], // Image array
          },
        ]
      }],
      conclusion: {
        type: String,
        required: true,
      },
    },
    images: {
      cover: {
        type: String,
        // required: true,
      },
      gallery: [{
        title: {
          type: String,
        },
        caption:{
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
        enum: ["1", "2", "3", "4", "5","6","7","8","9","10"],
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
export const Event = mongoose.model("Event", eventSchema);
