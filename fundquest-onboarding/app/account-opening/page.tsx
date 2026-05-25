"use client";

import { useForm } from "react-hook-form";

export default function AccountOpeningPage() {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    const response = await fetch("/api/generate-pdf", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const blob = await response.blob();

    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "account-opening-form.pdf";
    a.click();
  };

  return (
    <div className="p-10 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">
        FundQuest Account Opening
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4"
      >
        <input
          {...register("surname")}
          placeholder="Surname"
          className="border p-3 w-full"
        />

        <input
          {...register("firstName")}
          placeholder="First Name"
          className="border p-3 w-full"
        />

        <input
          {...register("bvn")}
          placeholder="BVN"
          className="border p-3 w-full"
        />

        <button
          type="submit"
          className="bg-black text-white px-6 py-3"
        >
          Generate PDF
        </button>
      </form>
    </div>
  );
}