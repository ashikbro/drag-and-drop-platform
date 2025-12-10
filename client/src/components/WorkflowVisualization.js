import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const WorkflowVisualization = ({ components }) => {
  const svgRef = useRef();

  useEffect(() => {
    if (!svgRef.current || components.length === 0) return;

    // Clear previous visualization
    d3.select(svgRef.current).selectAll('*').remove();

    const width = svgRef.current.clientWidth;
    const height = 300;

    const svg = d3
      .select(svgRef.current)
      .attr('width', width)
      .attr('height', height);

    // Create nodes from components
    const nodes = components.map((comp, index) => ({
      id: comp.id,
      name: comp.type,
      x: 100 + (index % 5) * 150,
      y: 100 + Math.floor(index / 5) * 100,
    }));

    // Create links between consecutive components
    const links = [];
    for (let i = 0; i < nodes.length - 1; i++) {
      links.push({
        source: nodes[i],
        target: nodes[i + 1],
      });
    }

    // Draw links
    svg
      .selectAll('.workflow-link')
      .data(links)
      .enter()
      .append('line')
      .attr('class', 'workflow-link')
      .attr('x1', (d) => d.source.x)
      .attr('y1', (d) => d.source.y)
      .attr('x2', (d) => d.target.x)
      .attr('y2', (d) => d.target.y)
      .attr('stroke', '#6b7280')
      .attr('stroke-width', 2)
      .attr('marker-end', 'url(#arrowhead)');

    // Define arrowhead marker
    svg
      .append('defs')
      .append('marker')
      .attr('id', 'arrowhead')
      .attr('viewBox', '0 0 10 10')
      .attr('refX', 8)
      .attr('refY', 5)
      .attr('markerWidth', 6)
      .attr('markerHeight', 6)
      .attr('orient', 'auto')
      .append('path')
      .attr('d', 'M 0 0 L 10 5 L 0 10 z')
      .attr('fill', '#6b7280');

    // Draw nodes
    const nodeGroup = svg
      .selectAll('.workflow-node')
      .data(nodes)
      .enter()
      .append('g')
      .attr('class', 'workflow-node')
      .attr('transform', (d) => `translate(${d.x}, ${d.y})`);

    nodeGroup
      .append('circle')
      .attr('r', 30)
      .attr('fill', '#3b82f6')
      .attr('stroke', '#1e40af')
      .attr('stroke-width', 2)
      .style('cursor', 'pointer');

    nodeGroup
      .append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', '.3em')
      .attr('fill', 'white')
      .attr('font-size', '10px')
      .attr('font-weight', 'bold')
      .text((d) => d.name.substring(0, 8));

    // Add drag behavior
    const drag = d3
      .drag()
      .on('start', function (event, d) {
        d3.select(this).raise().attr('stroke', 'black');
      })
      .on('drag', function (event, d) {
        d.x = event.x;
        d.y = event.y;
        d3.select(this).attr('transform', `translate(${d.x}, ${d.y})`);
        
        // Update links
        svg.selectAll('.workflow-link')
          .attr('x1', (link) => link.source.x)
          .attr('y1', (link) => link.source.y)
          .attr('x2', (link) => link.target.x)
          .attr('y2', (link) => link.target.y);
      })
      .on('end', function (event, d) {
        d3.select(this).attr('stroke', null);
      });

    nodeGroup.call(drag);
  }, [components]);

  return (
    <div className="border-t border-gray-200 bg-white p-4">
      <h3 className="text-lg font-bold mb-2">Workflow Visualization</h3>
      <p className="text-sm text-gray-600 mb-4">
        Visual representation of component relationships (drag nodes to rearrange)
      </p>
      {components.length === 0 ? (
        <div className="text-center text-gray-400 py-10">
          <p>Add components to see workflow visualization</p>
        </div>
      ) : (
        <svg ref={svgRef} className="w-full border border-gray-200 rounded"></svg>
      )}
    </div>
  );
};

export default WorkflowVisualization;
