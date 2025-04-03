"use client";

import addMessage from "@/app/actions/addMessage";
import { useSession } from "next-auth/react";
import { useActionState, useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { FaPaperPlane } from "react-icons/fa";
import { toast } from "react-toastify";
import SubmitMesssageButton from "./SubmitMesssageButton";

const PropertyContactForm = ({ property }) => {
  const { data: session, status, update } = useSession();

  //const [state, formAction] = useFormState(addMessage, {});
  const [state, formAction] = useActionState(addMessage, {});

  useEffect(() => {
    if (state.error) toast.error(state.error);
    if (state.submitted) {
      toast.success("Message sent successfully");
    }
  }, [state]);

  if (state.submitted) {
    return <p className="text-green-500 mb-4">your message has been sent</p>;
  }

  return (
    session && (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold mb-6">Contact Property Manager</h3>
        <form action={formAction}>
          <input
            type="hidden"
            id="property"
            name="property"
            defaultValue={property._id}
          />
          <input
            type="hidden"
            id="recipient"
            name="recipient"
            defaultValue={property.owner}
          />
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Name
            </label>
            <input
              type="text"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              name="name"
              placeholder="Enter your name"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Email
            </label>
            <input
              type="text"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              name="email"
              placeholder="Enter your Email"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="phone"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Phone
            </label>
            <input
              type="text"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="phone"
              name="phone"
              placeholder="Enter your Phone"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="body"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Message
            </label>
            <textarea
              type="text"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 h-44 focus:outline-none focus:shadow-outline"
              id="body"
              name="body"
              placeholder="Enter your Message"
            ></textarea>
          </div>
          <div>
            <SubmitMesssageButton />
          </div>
        </form>
      </div>
    )
  );
};

export default PropertyContactForm;
