/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useGame } from './GameContext';
import { SKILLS_DATA, SKILL_CONNECTIONS } from '../data/skillData';

const SkillTreeContext = createContext();

const LOCAL_STORAGE_KEY = 'gvoid_skill_tree';

export const SkillTreeProvider = ({ children }) => {
    const { voidMatter, subtractVoidMatter, setGameModifiers } = useGame();

    const [unlockedSkills, setUnlockedSkills] = useState(() => {
        try {
            const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
            return saved ? JSON.parse(saved) : [];
        } catch (error) {
            console.error('Failed to load skill tree from localStorage:', error);
            return [];
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(unlockedSkills));
        } catch (error) {
            console.error('Failed to save skill tree to localStorage:', error);
        }
    }, [unlockedSkills]);

    const hasSkill = useCallback((skillId) => unlockedSkills.includes(skillId), [unlockedSkills]);

    useEffect(() => {
        if (setGameModifiers) {
            let compiledModifiers = {
                singularity: hasSkill('singularity'),
                momentum: hasSkill('momentum'),
                voidAscendant: hasSkill('void_ascendant'),
                xpMultiplier: 0,
                flatXpBonus: 0,
                voidMatterChance: 0
            };

            unlockedSkills.forEach(skillId => {
                const skill = SKILLS_DATA[skillId];
                if (skill && skill.stats) {
                    if (skill.stats.xpMultiplier) compiledModifiers.xpMultiplier += skill.stats.xpMultiplier;
                    if (skill.stats.flatXpBonus) compiledModifiers.flatXpBonus += skill.stats.flatXpBonus;
                    if (skill.stats.voidMatterChance) compiledModifiers.voidMatterChance += skill.stats.voidMatterChance;
                }
            });

            setGameModifiers(compiledModifiers);
        }
    }, [unlockedSkills, hasSkill, setGameModifiers]);

    const canUnlock = (skillId) => {
        const skill = SKILLS_DATA[skillId];
        if (!skill) return false;

        // Already unlocked
        if (hasSkill(skillId)) return false;

        // Can afford?
        if (voidMatter < skill.cost) return false;

        // Prerequisites met?
        if (skill.prerequisites.length > 0) {
            const hasAllPrereqs = skill.prerequisites.every(prereq => hasSkill(prereq));
            if (!hasAllPrereqs) return false;
        }

        return true;
    };

    const unlockSkill = (skillId) => {
        if (!canUnlock(skillId)) return false;

        const cost = SKILLS_DATA[skillId].cost;
        subtractVoidMatter(cost);

        setUnlockedSkills(prev => [...prev, skillId]);
        return true;
    };

    return (
        <SkillTreeContext.Provider value={{
            skills: SKILLS_DATA,
            connections: SKILL_CONNECTIONS,
            unlockedSkills,
            hasSkill,
            canUnlock,
            unlockSkill
        }}>
            {children}
        </SkillTreeContext.Provider>
    );
};

export const useSkillTree = () => useContext(SkillTreeContext);
