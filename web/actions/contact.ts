"use server";

import { getClient } from "@/apollo";
import { gql } from "@apollo/client";

export const legacy = async (
  formData: FormData,
  params: {
    prefix?: string;
    locale: string;
    page?: string;
  },
) => {
  if (formData.get("surname")) {
    const rawFormData = {
      name: formData.get("name"),
      surname: formData.get("surname"),
      email: formData.get("email"),
    };
  }

  const rawFormData = {
    name: formData.get("name"),
    email: formData.get("email"),
    tel: params.prefix! + formData.get("tel"),
    message: formData.get("message"),
    inquiry: {
      buying: formData.get("buying") === "on",
      selling: formData.get("selling") === "on",
      chartering: formData.get("chartering") === "on",
      other: formData.get("other") === "on",
    },
    newsletter: formData.get("newsletter") === "on",
    status: "unclaimed",
  };

  /*
  const customer = await Customer.findOne({ email: rawFormData.email }).exec();
  if (customer) {
    customer.name = rawFormData.name;
    customer.email = rawFormData.email;
    customer.tel = rawFormData.tel;
    customer.message = rawFormData.message;
    customer.inquiry = rawFormData.inquiry;
    customer.newsletter = rawFormData.newsletter;
    customer.status = rawFormData.status;
    customer.save();
    return;
  }

  await Newsletter.findOneAndDelete({
    email: rawFormData.email,
  });
  await Customer.create(rawFormData);*/
};

export const contact = async ({
  formData,
  params,
}: {
  formData: FormData;
  params: { locale: string; page: string; prefix?: string };
}) => {
  const client = getClient();
  const mutation = gql`
    mutation CreateMessage($data: mutationMessageInput!) {
      createMessage(data: $data) {
        id
        name
        email
        tel
        message
        page
        newsletter
      }
    }
  `;

  const variables = {
    data: {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
      page: params.page,
    },
  };

  const { data } = await client.mutate({
    mutation,
    variables,
  });

  return data.createMessage;
};
