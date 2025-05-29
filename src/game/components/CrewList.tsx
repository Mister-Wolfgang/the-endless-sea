import React from 'react';
import { useCrew, useCrewData } from '../hooks';
import { CrewRole } from '../types';

export const CrewList: React.FC = () => {
  const { crew } = useCrewData();
  // const { removeCrewMember } = useCrew(); // Unused for now

  const getRoleIcon = (role: CrewRole): string => {
    const icons: Record<CrewRole, string> = {
      [CrewRole.CAPTAIN]: '👑',
      [CrewRole.FIRST_MATE]: '⚓',
      [CrewRole.NAVIGATOR]: '🧭',
      [CrewRole.QUARTERMASTER]: '📦',
      [CrewRole.BOATSWAIN]: '🔧',
      [CrewRole.GUNNER]: '💣',
      [CrewRole.CARPENTER]: '🔨',
      [CrewRole.COOK]: '👨‍🍳',
      [CrewRole.SURGEON]: '⚕️',
      [CrewRole.SAILOR]: '⛵',
      [CrewRole.LOOKOUT]: '👀',
      [CrewRole.CABIN_BOY]: '🧒',
      [CrewRole.MARINE]: '🛡️',
      [CrewRole.MAGE]: '🔮',
    };
    return icons[role];
  };

  const getRoleName = (role: CrewRole): string => {
    const names: Record<CrewRole, string> = {
      [CrewRole.CAPTAIN]: 'Capitaine',
      [CrewRole.FIRST_MATE]: 'Second',
      [CrewRole.NAVIGATOR]: 'Navigateur',
      [CrewRole.QUARTERMASTER]: 'Quartier-maître',
      [CrewRole.BOATSWAIN]: 'Maître d&apos;équipage',
      [CrewRole.GUNNER]: 'Canonnier',
      [CrewRole.CARPENTER]: 'Charpentier',
      [CrewRole.COOK]: 'Cuisinier',
      [CrewRole.SURGEON]: 'Chirurgien',
      [CrewRole.SAILOR]: 'Marin',
      [CrewRole.LOOKOUT]: 'Vigie',
      [CrewRole.CABIN_BOY]: 'Mousse',
      [CrewRole.MARINE]: 'Fusilier marin',
      [CrewRole.MAGE]: 'Mage',
    };
    return names[role];
  };

  const getHealthColor = (current: number, maximum: number): string => {
    const percentage = (current / maximum) * 100;
    if (percentage >= 80) return 'text-green-600';
    if (percentage >= 50) return 'text-yellow-600';
    if (percentage >= 25) return 'text-orange-600';
    return 'text-red-600';
  };

  const getMoraleColor = (morale: number): string => {
    if (morale >= 80) return 'bg-green-500';
    if (morale >= 60) return 'bg-yellow-500';
    if (morale >= 40) return 'bg-orange-500';
    return 'bg-red-500';
  };

  if (crew.length === 0) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6 text-center">
        <p className="text-gray-500">Aucun membre d'équipage à bord</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800">
          👥 Équipage ({crew.length} membres)
        </h3>
      </div>

      <div className="divide-y divide-gray-200">
        {crew.map((member) => (
          <div
            key={member.id}
            className="px-6 py-4 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="text-2xl">{getRoleIcon(member.role)}</div>
                <div>
                  <h4 className="font-semibold text-gray-800">{member.name}</h4>
                  <p className="text-sm text-gray-600">
                    {getRoleName(member.role)} - Niveau {member.level}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                {/* Santé */}
                <div className="text-center">
                  <div className="text-xs text-gray-500 mb-1">Santé</div>
                  <div
                    className={`font-semibold ${getHealthColor(member.health.current, member.health.maximum)}`}
                  >
                    {member.health.current}/{member.health.maximum}
                  </div>
                </div>

                {/* Moral */}
                <div className="text-center">
                  <div className="text-xs text-gray-500 mb-1">Moral</div>
                  <div className="flex items-center space-x-2">
                    <div className="w-12 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all duration-300 ${getMoraleColor(member.morale)}`}
                        style={{ width: `${member.morale}%` }}
                      />
                    </div>
                    <span className="text-xs font-medium text-gray-700">
                      {member.morale}%
                    </span>
                  </div>
                </div>

                {/* Salaire */}
                <div className="text-center">
                  <div className="text-xs text-gray-500 mb-1">Salaire</div>
                  <div className="font-semibold text-yellow-600">
                    {member.salary} pièces
                  </div>
                </div>
              </div>
            </div>

            {/* Compétences principales */}
            <div className="mt-3 grid grid-cols-4 gap-2">
              <div className="text-center">
                <div className="text-xs text-gray-500">Matelotage</div>
                <div className="text-sm font-medium">
                  {member.skills.seamanship}
                </div>
              </div>
              <div className="text-center">
                <div className="text-xs text-gray-500">Combat</div>
                <div className="text-sm font-medium">
                  {member.skills.combat}
                </div>
              </div>
              <div className="text-center">
                <div className="text-xs text-gray-500">Navigation</div>
                <div className="text-sm font-medium">
                  {member.skills.navigation}
                </div>
              </div>
              <div className="text-center">
                <div className="text-xs text-gray-500">Artillerie</div>
                <div className="text-sm font-medium">
                  {member.skills.gunnery}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
