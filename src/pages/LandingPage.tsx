import { motion } from "motion/react";
import Hero from "../components/Hero";
import MiniArrayPreview from "../components/MiniPreviews/MiniArrayPreview";
import MiniLinkedListPreview from "../components/MiniPreviews/MiniLinkedListPreview";
import MiniStackPreview from "../components/MiniPreviews/MiniStackPreview";
import MiniQueuePreview from "../components/MiniPreviews/MiniQueuePreview";
import MiniTreePreview from "../components/MiniPreviews/MiniTreePreview";
import MiniGraphPreview from "../components/MiniPreviews/MiniGraphPreview";
import { Link } from "react-router-dom";

const dsaCards = [
  { title: "Array", desc: "Linear data structure with contiguous memory.", preview: <MiniArrayPreview /> },
  { title: "Linked List", desc: "Sequence of nodes where each node points to the next.", preview: <MiniLinkedListPreview /> },
  { title: "Stack", desc: "LIFO structure for push and pop operations.", preview: <MiniStackPreview /> },
  { title: "Queue", desc: "FIFO structure for enqueue and dequeue operations.", preview: <MiniQueuePreview /> },
  { title: "Trees", desc: "Hierarchical structure with a root and children nodes.", preview: <MiniTreePreview /> },
  { title: "Graphs", desc: "Set of nodes connected by edges.", preview: <MiniGraphPreview /> },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      <Hero />
      
      <section className="py-24 px-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">Explore Data Structures</h2>
          <p className="text-gray-400 text-lg">Interactive visualizations to help you master the fundamentals.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {dsaCards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-spotify-gray border border-white/5 p-8 rounded-2xl hover:border-lavender-light/30 transition-all group"
            >
              <div className="mb-8 h-40 flex items-center justify-center bg-black/40 rounded-xl">
                {card.preview}
              </div>
              <h3 className="text-2xl font-bold mb-3">{card.title}</h3>
              <p className="text-gray-400 mb-6 line-clamp-2">{card.desc}</p>
              <Link
                to={`/module/${card.title.toLowerCase().replace(" ", "-")}`}
                className="inline-flex items-center gap-2 text-lavender-light font-semibold hover:gap-3 transition-all"
              >
                Visualize →
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
