import bookQuietHours from "@/assets/book-quiet-hours.jpg";
import bookSaltCedar from "@/assets/book-salt-cedar.jpg";
import bookFieldGuide from "@/assets/book-field-guide.jpg";
import bookCartographer from "@/assets/book-cartographer.jpg";
import bookLighthouse from "@/assets/book-lighthouse.jpg";
import bookNocturne from "@/assets/book-nocturne.jpg";
import bookGarden from "@/assets/book-garden.jpg";
import bookMarginalia from "@/assets/book-marginalia.jpg";
import authorHalloran from "@/assets/author-halloran.jpg";
import authorOkonkwo from "@/assets/author-okonkwo.jpg";
import authorSable from "@/assets/author-sable.jpg";

export interface Book {
  title: string;
  author: string;
  month: string;
  genre: string;
  cover: string;
  note: string;
}

export interface ClubEvent {
  date: string;
  title: string;
  detail: string;
}

export interface Author {
  name: string;
  role: string;
  portrait: string;
  bio: string;
  book: string;
}

export const books: Book[] = [
  {
    title: "The Quiet Hours",
    author: "M. E. Halloran",
    month: "October",
    genre: "Fiction",
    cover: bookQuietHours,
    note: "A coastal town, a house left half-packed, and the long evenings where memory does its quiet work.",
  },
  {
    title: "Salt & Cedar",
    author: "R. Okonkwo",
    month: "October",
    genre: "Fiction",
    cover: bookSaltCedar,
    note: "Three generations of one family, told through the trees they planted and the ones they cut down.",
  },
  {
    title: "A Field Guide to Forgetting",
    author: "T. Sable",
    month: "October",
    genre: "Fiction",
    cover: bookFieldGuide,
    note: "An archivist begins erasing her own records — and discovers what a life looks like without its paper trail.",
  },
  {
    title: "The Cartographer's Widow",
    author: "L. Fontaine",
    month: "November",
    genre: "Fiction",
    cover: bookCartographer,
    note: "She finishes her husband's final map, and finds an island on it that no one has ever sailed to.",
  },
  {
    title: "The Lighthouse Ledger",
    author: "A. Brennan",
    month: "November",
    genre: "Historical",
    cover: bookLighthouse,
    note: "A keeper's account book from 1893 becomes a murder record, one grocery line at a time.",
  },
  {
    title: "Nocturne for a River",
    author: "I. Petrov",
    month: "December",
    genre: "Fiction",
    cover: bookNocturne,
    note: "A night ferryman carries the same passengers across the same river, year after year, as the city changes around him.",
  },
  {
    title: "What the Garden Keeps",
    author: "H. Lindqvist",
    month: "December",
    genre: "Memoir",
    cover: bookGarden,
    note: "A gardener inherits her grandmother's overgrown plot and, with it, a family history written in seed packets.",
  },
  {
    title: "Marginalia",
    author: "J. Okafor-Reyes",
    month: "January",
    genre: "Essays",
    cover: bookMarginalia,
    note: "Essays on reading in the margins — of books, of cities, of other people's expectations.",
  },
];

export const featuredBooks = books.slice(0, 4);

export const events: ClubEvent[] = [
  {
    date: "OCT 14",
    title: "The Quiet Hours",
    detail: "Reading room, 6:30pm · facilitated by D. Marsh",
  },
  {
    date: "OCT 28",
    title: "Salt & Cedar",
    detail: "The Bindery, 7:00pm · port & shortbread",
  },
  {
    date: "NOV 11",
    title: "A Field Guide to Forgetting",
    detail: "Online salon, 8:00pm · open to all members",
  },
  {
    date: "NOV 25",
    title: "The Cartographer's Widow",
    detail: "Reading room, 6:30pm · closing the season",
  },
];

export const allEvents: ClubEvent[] = [
  ...events,
  {
    date: "DEC 09",
    title: "The Lighthouse Ledger",
    detail: "The Bindery, 7:00pm · with archival photographs",
  },
  {
    date: "DEC 16",
    title: "Nocturne for a River",
    detail: "Reading room, 6:30pm · winter solstice reading",
  },
  {
    date: "JAN 13",
    title: "What the Garden Keeps",
    detail: "Online salon, 8:00pm · memoir night",
  },
  {
    date: "JAN 27",
    title: "Marginalia",
    detail: "Reading room, 6:30pm · bring a pencil",
  },
];

export const authors: Author[] = [
  {
    name: "Marguerite Ellison Halloran",
    role: "Author in residence · October",
    portrait: authorHalloran,
    bio: "Halloran writes the slow life in long sentences. Her novels about memory and weather have been translated into nineteen languages, and she still drafts every first chapter by hand.",
    book: "The Quiet Hours",
  },
  {
    name: "Rotimi Okonkwo",
    role: "Visiting author · November",
    portrait: authorOkonkwo,
    bio: "Okonkwo's family sagas are built like forests — patient, layered, and full of birdsong. He joins the club for an evening on inheritance, land, and the stories trees keep.",
    book: "Salt & Cedar",
  },
  {
    name: "Thea Sable",
    role: "Debut voice · January",
    portrait: authorSable,
    bio: "Sable worked as an archivist for a decade before writing her first novel. Her work asks what we owe to the records we keep — and the ones we burn.",
    book: "A Field Guide to Forgetting",
  },
];

export const testimonials = [
  {
    quote:
      "I came for the books and stayed for the people. It feels like a library that remembers your name.",
    name: "Eleanor V.",
    since: "member since 2021",
  },
  {
    quote:
      "The only place I read the hardback, not the app. The pace is exactly right.",
    name: "Thomas R.",
    since: "member since 2020",
  },
  {
    quote:
      "Every discussion ends with a new book on my nightstand. Aurevane ruined me for faster.",
    name: "Priya N.",
    since: "member since 2022",
  },
];
