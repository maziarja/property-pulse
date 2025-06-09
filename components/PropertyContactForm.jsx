"use client";

import { addMessage } from "@/app/actions/addMessage";
import { useActionState, useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
import { FaPaperPlane } from "react-icons/fa";
import { toast } from "react-toastify";

const PropertyContactForm = ({ property }) => {
  // WAY 1)

  // const [result, setResult] = useState();
  // async function handleAddMessage(formData) {
  //   const result = await addMessage(formData);
  //   if (result.error) toast.error(result.error);
  //   if (result.submitted) toast.success("Message sent successfully");
  //   if (result.submitted) setResult(result.submitted);
  // }
  // if (result)
  //   return <p className="text-green-500 mb-4">Your message has been sent</p>;

  // WAY 2)

  const [state, formAction] = useActionState(addMessage, {});

  useEffect(() => {
    if (state.error) toast.error(state.error);
    if (state.submitted) toast.success("Message sent successfully");
  }, [state]);

  if (state.submitted)
    return <p className="text-green-500 mb-4">Your message has been sent</p>;

  return (
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
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="name"
          >
            Name:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            name="name"
            type="text"
            placeholder="Enter your name"
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="phone"
          >
            Phone:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="phone"
            name="phone"
            type="text"
            placeholder="Enter your phone number"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="message"
          >
            Message:
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 h-44 focus:outline-none focus:shadow-outline"
            id="message"
            name="message"
            placeholder="Enter your message"
          ></textarea>
        </div>
        <div>
          <Button />
        </div>
      </form>
    </div>
  );
};
export default PropertyContactForm;

const Button = () => {
  const { pending } = useFormStatus();

  return (
    <button
      className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline flex items-center justify-center"
      type="submit"
      disabled={pending}
    >
      <FaPaperPlane className="mr-2" />
      {!pending ? "Send Message" : "Sending..."}
    </button>
  );
};
