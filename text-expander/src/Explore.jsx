import PropTypes from "prop-types";
import { useState } from "react";

export default function Explore() {
  return (
    <div className="bg-red-300">
      hello
      <TextExpander collapseNumWords={5}>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quidem, a? Lorem ipsum dolor sit
        amet consectetur, adipisicing elit. Quidem, a? Lorem ipsum dolor sit amet consectetur,
        adipisicing elit. Quidem, a? Lorem ipsum dolor sit amet consectetur, adipisicing elit.
        Quidem, a?
      </TextExpander>
      <TextExpander
        expandButtonText="Show text"
        collapseNumWords={15}
        btnColor="bg-blue-500"
        className="bg-yellow-500"
      >
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quidem, a Lorem, ipsum dolor sit
        amet consectetur adipisicing elit. Architecto veniam perferendis cupiditate ipsum iste
        minima earum ullam voluptatem sed dolor.?
      </TextExpander>
      <TextExpander expanded={true} className="bg-violet-400">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quidem, a? Lorem ipsum dolor sit
        amet, consectetur adipisicing elit. Fuga quisquam delectus, pariatur alias quae facere sed
        natus dolorem neque doloribus!
      </TextExpander>
    </div>
  );
}

function TextExpander({
  collapsedNumWords = 10,
  children,
  className,
  btnColor = "bg-red-500",
  expandButtonText = "Show more",
  expanded = false,
  collapseButtonText = "Show less",
}) {
  const [isExpanded, setIsExpanded] = useState(expanded);
  const displayText = isExpanded
    ? children
    : children.split(" ").slice(0, collapsedNumWords).join(" ") + "...";
  return (
    <div className={className}>
      <span>{displayText}</span>
      <button
        className={`mx-2 p-1 text-white ${btnColor}`}
        onClick={() => setIsExpanded((exp) => !exp)}
      >
        {isExpanded ? collapseButtonText : expandButtonText}
      </button>
    </div>
  );
}

TextExpander.propTypes = {
  children: PropTypes.node,
  className: PropTypes.node,
  expanded: PropTypes.node,
  expandButtonText: PropTypes.node,
  collapseButtonText: PropTypes.node,
  collapsedNumWords: PropTypes.number,
  btnColor: PropTypes.node,
};
