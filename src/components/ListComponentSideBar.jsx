import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { TABS } from "../data/tabs";
import { useGetCurrentTab } from "../hooks/useGetCurrentTab";

export function ListComponentSideBar() {
  const [activeTab, setActiveTab] = useGetCurrentTab(TABS);

  return (
    <div className="flex flex-col ">
      {TABS.map((tab) => (
        <Link to={tab.path} key={tab.id}>
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={` relative min-w-[90%] mx-auto px-3 py-3 text-lg font-thin transition focus-visible:outline-2 flex justify-start items-center`}
          >
            {activeTab === tab.id && (
              <motion.span
                layoutId="bubble"
                className={`absolute rounded-full inset-0 z-10  mix-blend-multiply bg-black`}
                transition={{
                  type: "spring",
                  bounce: 0.2,
                  duration: 0.5,
                }}
              />
            )}
            <motion.img
              src={tab.img}
              className={`inline-block max-w-[1.2rem] mr-5 z-20 ${
                activeTab === tab.id ? "invert" : ""
              }`}
              animate={{
                filter: activeTab === tab.id ? "invert(1)" : "invert(0)",
              }}
              transition={{ duration: 0.2, delay: 0.15 }}
            />
            <motion.span
              className="z-20"
              animate={{
                color: activeTab === tab.id ? "white" : "black",
              }}
              transition={{ duration: 0.2, delay: 0.15 }}
            >
              {tab.label}
            </motion.span>
          </button>
        </Link>
      ))}
    </div>
  );
}
