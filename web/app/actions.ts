"use server";

import axios from "axios";
import { formatCurrency } from "@/utils/yachts";
import { Yacht } from "@/models/yacht";
import { Customer } from "@/models/customer";
import { Newsletter } from "@/models/newsletter";
import { Destination } from "@/models/destination";

export const contact = async (formData: FormData, prefix?: string) => {
  if (formData.get("surname")) {
    const rawFormData = {
      name: formData.get("name"),
      surname: formData.get("surname"),
      email: formData.get("email"),
    };

    const exists = await Newsletter.findOne({
      email: rawFormData.email,
    }).exec();
    if (exists) {
      exists.name = rawFormData.name;
      exists.surname = rawFormData.surname;
      exists.email = rawFormData.email;
      exists.save();
      return;
    }

    const customer = await Customer.findOne({
      email: rawFormData.email,
    }).exec();
    if (customer) {
      customer.name = `${rawFormData.name} ${rawFormData.surname}`;
      customer.email = rawFormData.email;
      customer.newsletter = true;
      customer.save();
      return;
    }

    await Newsletter.create(rawFormData);
    return;
  }

  const rawFormData = {
    name: formData.get("name"),
    email: formData.get("email"),
    tel: prefix! + formData.get("tel"),
    message: formData.get("message"),
    inquiry: {
      buying: formData.get("buying") === "on",
      selling: formData.get("selling") === "on",
      chartering: formData.get("chartering") === "on",
      other: formData.get("other") === "on",
    },
    newsletter: formData.get("newsletter") === "on",
  };

  const customer = await Customer.findOne({ email: rawFormData.email }).exec();
  if (customer) {
    customer.name = rawFormData.name;
    customer.email = rawFormData.email;
    customer.tel = rawFormData.tel;
    customer.message = rawFormData.message;
    customer.inquiry = rawFormData.inquiry;
    customer.newsletter = rawFormData.newsletter;
    customer.save();
    return;
  }

  await Newsletter.findOneAndDelete({
    email: rawFormData.email,
  });
  await Customer.create(rawFormData);
};

export const fetchFeatured = async () => {
  return await Yacht.find({ featured: true })
    .select("_id name price builder length yearBuilt sleeps")
    .catch((e) => {
      throw e;
    });
};

export const fetchDestinations = async () => {
  return await Destination.find()
    .select("_id country region")
    .catch((e) => {
      throw e;
    });
};

export const convertCurrency = async (amount: number, currency: string) => {
  if (currency === "EUR") return formatCurrency(amount, currency);
  try {
    const res = await axios.get(
      `https://api.freecurrencyapi.com/v1/latest?apikey=${process.env.CURRENCY_API_KEY}&currencies=${currency}&base_currency=EUR`,
    );
    return formatCurrency(amount * res.data.data[currency], currency);
  } catch (e) {
    console.error("Error fetching currency: ", e);
    return formatCurrency(amount, currency);
  }
};
