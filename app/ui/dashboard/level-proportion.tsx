'use client';
import * as d3 from 'd3';
import { useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import React from 'react';
import Chart from 'chart.js/auto';


export type LevelCount = {
  level: string;
  count: number;
};

interface LevelProportionProps {
  data: LevelCount[];
}




export default function LevelProportion() {
  const ref = useRef<SVGSVGElement>(null);
  const [data, setData] = React.useState<LevelCount[]>([]);

  React.useEffect(() => {
    fetch('/api/level-proportion', {
      cache: 'no-store',
    })
      .then((res) => res.json())
      .then((fetchedData) => {
        setData(fetchedData);
      })
      .catch((error) => {
        console.error('Error fetching level proportion data:', error);
      });
  }, []);

  console.log('LevelProportion data:', data);

  React.useEffect(() => {
    if (!data || data.length === 0) return;

    const width = 320;
    const height = 320;
    const radius = Math.min(width, height) / 2 - 10;

    d3.select(ref.current).selectAll('*').remove();

    const svg = d3
      .select(ref.current)
      .attr('width', width)
      .attr('height', height);

    const g = svg
      .append('g')
      .attr('transform', `translate(${width / 2},${height / 2})`);

    const color = d3
      .scaleOrdinal<string>()
      .domain(data.map((d) => d.level))
      .range(d3.schemeCategory10);

    const pie: d3.Pie<LevelCount, LevelCount> = d3
      .pie<LevelCount>()
      .value((d: LevelCount) => d.count)
      .sort(null);

    const arc = d3.arc<d3.PieArcDatum<LevelCount>>()
      .innerRadius(0)
      .outerRadius(radius);

    const arcs = g.selectAll('arc')
      .data(pie(data))
      .enter()
      .append('g');

    arcs
      .append('path')
      .attr('fill', (d: d3.PieArcDatum<LevelCount>) => color(d.data.level))
      .transition()
      .duration(800)
      .attrTween('d', function (d) {
        const i = d3.interpolate(
          { startAngle: d.startAngle, endAngle: d.startAngle },
          d
        );
        return function (t) {
          return arc(i(t)) as string;
        };
      });

    arcs
      .append('text')
      .attr('transform', (d: LevelCount) => `translate(${arc.centroid(d)})`)
      .attr('text-anchor', 'middle')
      .attr('font-size', 14)
      .attr('fill', '#fff')
      .text((d: d3.PieArcDatum<LevelCount>) => `L${d.data.level}`);

    // 图例
    const legend = svg.append('g')
      .attr('transform', `translate(10, 10)`);

    data.forEach((d, i) => {
      legend.append('rect')
        .attr('x', 0)
        .attr('y', i * 24)
        .attr('width', 18)
        .attr('height', 18)
        .attr('fill', color(d.level));
      legend.append('text')
        .attr('x', 26)
        .attr('y', i * 24 + 14)
        .attr('font-size', 14)
        .text(`Level ${d.level}: ${d.count}`);
    });
  }, [data]);

  return (
    <Box sx={{ p: 2, bgcolor: 'white', borderRadius: 2, boxShadow: 1, width: 360 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>公司Level占比</Typography>
      <svg ref={ref}></svg>
    </Box>
  );
}

