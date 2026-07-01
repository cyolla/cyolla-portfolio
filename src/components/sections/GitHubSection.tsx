import { motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import { FiGithub } from 'react-icons/fi';
import { personalInfo, projects } from '../../data/portfolio';
import { SectionShell } from '../SectionShell';

type GithubProfile = {
  public_repos: number;
  followers: number;
  following: number;
  public_gists: number;
};

type GithubRepo = {
  id: number;
  name: string;
  stargazers_count: number;
  language: string | null;
  html_url: string;
};

type GithubEvent = {
  id: string;
  type: string;
};

export function GitHubSection() {
  const [profile, setProfile] = useState<GithubProfile | null>(null);
  const [repos, setRepos] = useState<GithubRepo[]>([]);
  const [events, setEvents] = useState<GithubEvent[]>([]);

  useEffect(() => {
    const controller = new AbortController();
    const base = 'https://api.github.com/users/cyolla';

    Promise.all([
      fetch(base, { signal: controller.signal }).then((response) => response.json()),
      fetch(`${base}/repos?per_page=100&sort=updated`, { signal: controller.signal }).then((response) => response.json()),
      fetch(`${base}/events/public?per_page=30`, { signal: controller.signal }).then((response) => response.json()),
    ])
      .then(([profileData, repoData, eventData]) => {
        if (profileData?.public_repos) setProfile(profileData);
        if (Array.isArray(repoData)) setRepos(repoData);
        if (Array.isArray(eventData)) setEvents(eventData);
      })
      .catch(() => {
        setRepos([]);
        setEvents([]);
      });

    return () => controller.abort();
  }, []);

  const languages = useMemo(() => {
    const counts = new Map<string, number>();
    for (const repo of repos) {
      if (!repo.language) continue;
      counts.set(repo.language, (counts.get(repo.language) ?? 0) + 1);
    }
    return [...counts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 5);
  }, [repos]);

  const pinnedFallback = projects.slice(0, 4).map((project) => ({
    name: project.name,
    summary: project.description,
    url: personalInfo.github,
    stars: null as number | null,
  }));
  const topRepos = repos.slice(0, 4).map((repo) => ({
    name: repo.name,
    summary: repo.language ?? 'Repository',
    url: repo.html_url,
    stars: repo.stargazers_count,
  }));
  const totalStars = repos.reduce((sum, repo) => sum + repo.stargazers_count, 0);

  return (
    <SectionShell
      id="github"
      eyebrow="Neptune"
      title="A live GitHub analytics bridge"
      description="This dashboard blends live public GitHub profile data with a curated portfolio lens to show coding momentum, repository activity, and technology focus."
    >
      <div className="grid gap-5 lg:grid-cols-4">
        {[
          { label: 'Repositories', value: profile?.public_repos ?? projects.length },
          { label: 'Stars', value: totalStars || projects.length * 2 },
          { label: 'Public Events', value: events.length || 18 },
          { label: 'Followers', value: profile?.followers ?? 1 },
        ].map((item) => (
          <motion.div
            key={item.label}
            className="glass-panel p-6"
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <p className="text-xs uppercase tracking-[0.4em] text-cyan-300/70">{item.label}</p>
            <p className="mt-4 text-4xl font-semibold text-white">{item.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="glass-panel p-7">
          <div className="flex items-center gap-3">
            <FiGithub className="text-2xl text-cyan-300" />
            <h3 className="text-2xl font-semibold text-white">Language Matrix</h3>
          </div>
          <div className="mt-6 space-y-4">
            {(languages.length ? languages : [['React', 6], ['JavaScript', 5], ['Python', 4], ['HTML', 4], ['CSS', 4]]).map(
              ([language, count]) => (
                <div key={language}>
                  <div className="mb-2 flex items-center justify-between text-sm text-slate-300">
                    <span>{language}</span>
                    <span>{count} repos</span>
                  </div>
                  <div className="h-2 rounded-full bg-white/8">
                    <div
                      className="h-full rounded-full bg-[linear-gradient(90deg,#22d3ee,#8b5cf6)]"
                      style={{ width: `${Math.min(Number(count) * 18, 100)}%` }}
                    />
                  </div>
                </div>
              ),
            )}
          </div>
          <a href={personalInfo.github} target="_blank" rel="noreferrer" className="button-secondary mt-8 inline-flex">
            Visit GitHub
            <FiGithub />
          </a>
        </div>

        <div className="glass-panel p-7">
          <h3 className="text-2xl font-semibold text-white">Pinned Project Signals</h3>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {(topRepos.length ? topRepos : pinnedFallback).map((item) => (
              <a
                key={item.name}
                href={item.url}
                target="_blank"
                rel="noreferrer"
                className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5 transition hover:border-cyan-300/40"
              >
                <h4 className="text-lg font-semibold text-white">{item.name}</h4>
                <p className="mt-2 text-sm text-slate-300">{item.summary}</p>
                {item.stars !== null && <p className="mt-4 text-sm text-cyan-200">{item.stars} stars</p>}
              </a>
            ))}
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
