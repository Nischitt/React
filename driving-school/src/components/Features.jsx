import { FaCar, FaUserTie, FaCertificate } from "react-icons/fa";

export default function Features() {
  const items = [
    {
      title: "Modern Cars",
      icon: <FaCar size={35} />
    },
    {
      title: "Expert Trainers",
      icon: <FaUserTie size={35} />
    },
    {
      title: "Certified Program",
      icon: <FaCertificate size={35} />
    }
  ];

  return (
    <section className="py-20 bg-gray-100">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-8">
        {items.map((item) => (
          <div
            key={item.title}
            className="bg-white p-8 rounded-xl shadow"
          >
            <div className="text-yellow-500 mb-4">
              {item.icon}
            </div>

            <h3 className="text-xl font-bold">
              {item.title}
            </h3>
          </div>
        ))}
      </div>
    </section>
  );
}