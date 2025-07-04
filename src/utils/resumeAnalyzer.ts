import type { ResumeAnalysis, SectionAnalysis, Suggestion } from '../types';

export function analyzeResume(content: string): ResumeAnalysis {
  const sections = {
    contact: analyzeContactSection(content),
    summary: analyzeSummarySection(content),
    experience: analyzeExperienceSection(content),
    skills: analyzeSkillsSection(content),
    education: analyzeEducationSection(content),
    format: analyzeFormatSection(content)
  };

  const suggestions = generateSuggestions(content, sections);
  const keywords = extractKeywords(content);
  const overallScore = calculateOverallScore(sections);

  return {
    overallScore,
    sections,
    suggestions,
    keywords,
    wordCount: content.split(/\s+/).length
  };
}

function analyzeContactSection(content: string): SectionAnalysis {
  const hasEmail = /@/.test(content);
  const hasPhone = /(\+?1?[-.\s]?)?\(?[0-9]{3}\)?[-.\s]?[0-9]{3}[-.\s]?[0-9]{4}/.test(content);
  const hasLinkedIn = /linkedin/i.test(content);
  const hasLocation = /(city|state|zip|address)/i.test(content) || /,\s*[A-Z]{2}/.test(content);

  let score = 0;
  const feedback: string[] = [];
  const suggestions: string[] = [];

  if (hasEmail) {
    score += 30;
    feedback.push('✓ Email address found');
  } else {
    feedback.push('✗ No email address detected');
    suggestions.push('Add a professional email address');
  }

  if (hasPhone) {
    score += 25;
    feedback.push('✓ Phone number found');
  } else {
    feedback.push('✗ No phone number detected');
    suggestions.push('Include your phone number');
  }

  if (hasLinkedIn) {
    score += 25;
    feedback.push('✓ LinkedIn profile mentioned');
  } else {
    suggestions.push('Add your LinkedIn profile URL');
  }

  if (hasLocation) {
    score += 20;
    feedback.push('✓ Location information found');
  } else {
    suggestions.push('Include your city and state');
  }

  const status = score >= 80 ? 'excellent' : score >= 60 ? 'good' : score >= 30 ? 'needs-improvement' : 'missing';

  return { score, status, feedback, suggestions };
}

function analyzeSummarySection(content: string): SectionAnalysis {
  const summaryKeywords = ['summary', 'objective', 'profile', 'about'];
  const hasSummary = summaryKeywords.some(keyword => 
    new RegExp(`\\b${keyword}\\b`, 'i').test(content)
  );

  let score = 0;
  const feedback: string[] = [];
  const suggestions: string[] = [];

  if (hasSummary) {
    score += 40;
    feedback.push('✓ Professional summary section found');
    
    const summaryLength = content.length;
    if (summaryLength > 100 && summaryLength < 300) {
      score += 30;
      feedback.push('✓ Good summary length (100-300 words)');
    } else if (summaryLength > 300) {
      feedback.push('⚠ Summary might be too long');
      suggestions.push('Consider shortening your summary to 2-3 sentences');
    } else {
      suggestions.push('Expand your summary to better showcase your value');
    }

    const hasAction = /(achieved|increased|improved|led|managed|developed)/i.test(content);
    if (hasAction) {
      score += 30;
      feedback.push('✓ Contains action words and achievements');
    } else {
      suggestions.push('Include specific achievements and action words');
    }
  } else {
    feedback.push('✗ No professional summary found');
    suggestions.push('Add a compelling professional summary at the top');
  }

  const status = score >= 80 ? 'excellent' : score >= 60 ? 'good' : score >= 30 ? 'needs-improvement' : 'missing';

  return { score, status, feedback, suggestions };
}

function analyzeExperienceSection(content: string): SectionAnalysis {
  const experienceKeywords = ['experience', 'employment', 'work history', 'career'];
  const hasExperience = experienceKeywords.some(keyword => 
    new RegExp(`\\b${keyword}\\b`, 'i').test(content)
  );

  let score = 0;
  const feedback: string[] = [];
  const suggestions: string[] = [];

  if (hasExperience) {
    score += 30;
    feedback.push('✓ Work experience section found');

    const bulletPoints = (content.match(/[•·-]\s/g) || []).length;
    if (bulletPoints >= 3) {
      score += 25;
      feedback.push('✓ Uses bullet points for experience');
    } else {
      suggestions.push('Use bullet points to list your accomplishments');
    }

    const hasQuantifiableResults = /(\d+%|\$\d+|\d+[kmb]|\d+\+|\d+ years?)/i.test(content);
    if (hasQuantifiableResults) {
      score += 25;
      feedback.push('✓ Contains quantifiable results');
    } else {
      suggestions.push('Add specific numbers and metrics to quantify your achievements');
    }

    const hasActionVerbs = /(managed|led|developed|implemented|increased|improved|created|designed)/gi.test(content);
    if (hasActionVerbs) {
      score += 20;
      feedback.push('✓ Uses strong action verbs');
    } else {
      suggestions.push('Start bullet points with strong action verbs');
    }
  } else {
    feedback.push('✗ No work experience section found');
    suggestions.push('Add a dedicated work experience section');
  }

  const status = score >= 80 ? 'excellent' : score >= 60 ? 'good' : score >= 30 ? 'needs-improvement' : 'missing';

  return { score, status, feedback, suggestions };
}

function analyzeSkillsSection(content: string): SectionAnalysis {
  const skillsKeywords = ['skills', 'competencies', 'technologies', 'technical skills'];
  const hasSkills = skillsKeywords.some(keyword => 
    new RegExp(`\\b${keyword}\\b`, 'i').test(content)
  );

  let score = 0;
  const feedback: string[] = [];
  const suggestions: string[] = [];

  if (hasSkills) {
    score += 40;
    feedback.push('✓ Skills section found');

    const technicalSkills = /(javascript|python|java|react|node|sql|aws|docker|kubernetes|git)/gi.test(content);
    if (technicalSkills) {
      score += 30;
      feedback.push('✓ Technical skills mentioned');
    }

    const softSkills = /(leadership|communication|teamwork|problem.solving|analytical)/gi.test(content);
    if (softSkills) {
      score += 30;
      feedback.push('✓ Soft skills included');
    } else {
      suggestions.push('Include relevant soft skills like leadership and communication');
    }
  } else {
    feedback.push('✗ No skills section found');
    suggestions.push('Add a skills section highlighting your technical and soft skills');
  }

  const status = score >= 80 ? 'excellent' : score >= 60 ? 'good' : score >= 30 ? 'needs-improvement' : 'missing';

  return { score, status, feedback, suggestions };
}

function analyzeEducationSection(content: string): SectionAnalysis {
  const educationKeywords = ['education', 'degree', 'university', 'college', 'bachelor', 'master', 'phd'];
  const hasEducation = educationKeywords.some(keyword => 
    new RegExp(`\\b${keyword}\\b`, 'i').test(content)
  );

  let score = 0;
  const feedback: string[] = [];
  const suggestions: string[] = [];

  if (hasEducation) {
    score += 50;
    feedback.push('✓ Education section found');

    const hasGPA = /gpa|grade point average|\d\.\d+/i.test(content);
    if (hasGPA) {
      score += 25;
      feedback.push('✓ GPA or academic achievement mentioned');
    }

    const hasGradDate = /(20\d{2}|19\d{2})/.test(content);
    if (hasGradDate) {
      score += 25;
      feedback.push('✓ Graduation date included');
    } else {
      suggestions.push('Include graduation year or expected graduation date');
    }
  } else {
    feedback.push('✗ No education section found');
    suggestions.push('Add an education section with your degrees and certifications');
  }

  const status = score >= 80 ? 'excellent' : score >= 60 ? 'good' : score >= 30 ? 'needs-improvement' : 'missing';

  return { score, status, feedback, suggestions };
}

function analyzeFormatSection(content: string): SectionAnalysis {
  let score = 0;
  const feedback: string[] = [];
  const suggestions: string[] = [];

  const wordCount = content.split(/\s+/).length;
  if (wordCount >= 200 && wordCount <= 800) {
    score += 30;
    feedback.push('✓ Appropriate length (200-800 words)');
  } else if (wordCount < 200) {
    feedback.push('⚠ Resume might be too short');
    suggestions.push('Add more detail to reach 200-800 words');
  } else {
    feedback.push('⚠ Resume might be too long');
    suggestions.push('Consider condensing content to stay under 800 words');
  }

  const hasConsistentFormatting = /[•·-]\s/.test(content);
  if (hasConsistentFormatting) {
    score += 25;
    feedback.push('✓ Uses consistent bullet points');
  } else {
    suggestions.push('Use consistent bullet points throughout');
  }

  const hasClearSections = content.split('\n').filter(line => line.trim().length > 0).length >= 5;
  if (hasClearSections) {
    score += 25;
    feedback.push('✓ Well-organized structure');
  } else {
    suggestions.push('Organize content into clear sections');
  }

  const hasNoPersonalPronouns = !/\b(I|me|my|myself)\b/gi.test(content);
  if (hasNoPersonalPronouns) {
    score += 20;
    feedback.push('✓ Avoids personal pronouns');
  } else {
    suggestions.push('Remove personal pronouns (I, me, my) for professional tone');
  }

  const status = score >= 80 ? 'excellent' : score >= 60 ? 'good' : score >= 30 ? 'needs-improvement' : 'missing';

  return { score, status, feedback, suggestions };
}

function generateSuggestions(content: string, sections: Record<string, SectionAnalysis>): Suggestion[] {
  const suggestions: Suggestion[] = [];

  // Critical issues
  if (!/@/.test(content)) {
    suggestions.push({
      type: 'critical',
      section: 'Contact',
      title: 'Missing Email Address',
      description: 'Your resume must include a professional email address for employers to contact you.',
      before: 'John Smith\n123 Main St',
      after: 'John Smith\njohn.smith@email.com\n123 Main St'
    });
  }

  if (sections.experience.score < 50) {
    suggestions.push({
      type: 'critical',
      section: 'Experience',
      title: 'Weak Work Experience Section',
      description: 'Your work experience needs more detail and quantifiable achievements to stand out.',
      before: 'Worked at ABC Company\nDid various tasks',
      after: 'Software Developer at ABC Company (2020-2023)\n• Developed web applications serving 10,000+ users\n• Improved system performance by 40%'
    });
  }

  // Important improvements
  if (!/(achieved|increased|improved|led|managed|developed)/i.test(content)) {
    suggestions.push({
      type: 'important',
      section: 'Content',
      title: 'Add Action Words and Achievements',
      description: 'Use strong action verbs and highlight specific achievements to make your resume more impactful.',
      before: 'Responsible for managing team',
      after: 'Led cross-functional team of 8 developers, improving delivery time by 30%'
    });
  }

  if (!/(\d+%|\$\d+|\d+[kmb]|\d+\+)/.test(content)) {
    suggestions.push({
      type: 'important',
      section: 'Metrics',
      title: 'Include Quantifiable Results',
      description: 'Add specific numbers, percentages, and metrics to demonstrate your impact.',
      before: 'Increased sales significantly',
      after: 'Increased sales by 25% ($50K) within 6 months'
    });
  }

  // Minor improvements
  if (/\b(I|me|my|myself)\b/gi.test(content)) {
    suggestions.push({
      type: 'minor',
      section: 'Writing Style',
      title: 'Remove Personal Pronouns',
      description: 'Use a professional tone by removing first-person pronouns.',
      before: 'I managed a team and I increased productivity',
      after: 'Managed team and increased productivity by 15%'
    });
  }

  return suggestions;
}

function extractKeywords(content: string): string[] {
  const commonKeywords = [
    'javascript', 'python', 'react', 'node.js', 'sql', 'aws', 'leadership',
    'project management', 'agile', 'scrum', 'communication', 'teamwork',
    'problem solving', 'analytical', 'strategic', 'innovation', 'development'
  ];

  return commonKeywords.filter(keyword => 
    new RegExp(`\\b${keyword}\\b`, 'i').test(content)
  );
}

function calculateOverallScore(sections: Record<string, SectionAnalysis>): number {
  const weights = {
    contact: 0.15,
    summary: 0.15,
    experience: 0.35,
    skills: 0.15,
    education: 0.10,
    format: 0.10
  };

  let totalScore = 0;
  for (const [section, weight] of Object.entries(weights)) {
    totalScore += sections[section].score * weight;
  }

  return Math.round(totalScore);
}