'use client';

import type { Phrase as PhraseType } from '@/components/phrase-settings-dialog';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';

interface PhraseFeedbackProps {
  phrases: PhraseType[];
}

export function PhraseFeedback({ phrases }: PhraseFeedbackProps) {
  const submittedPhrases = phrases.filter((phrase) => phrase.isSubmitted);
  const loadingPhrase = phrases.find((phrase) => phrase.isLoading);

  if (submittedPhrases.length === 0 && !loadingPhrase) {
    return null;
  }

  return (
    <div className="p-4 space-y-2">
      {submittedPhrases.map((phrase) => (
        <Card 
          key={phrase.id}
          className={
            phrase.isCorrect === true 
              ? "bg-green-50 border-green-200" 
              : phrase.isCorrect === false 
              ? "bg-red-50 border-red-200" 
              : ""
          }
        >
          <CardContent className="p-3">
            <div className="flex items-start gap-2">
              {phrase.isCorrect === true && (
                <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
              )}
              {phrase.isCorrect === false && (
                <XCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
              )}
              <div className="flex-1">
                <div className="font-medium">{phrase.text}</div>
                {phrase.userTranslation && (
                  <div className="text-sm text-muted-foreground mt-1">
                    → {phrase.userTranslation}
                  </div>
                )}
                {phrase.isCorrect === false && phrase.feedback && (
                  <div className="text-xs text-red-600 mt-1">
                    {phrase.feedback}
                  </div>
                )}
                {phrase.isCorrect === false && phrase.suggestions && phrase.suggestions.length > 0 && (
                  <div className="text-xs text-muted-foreground mt-1">
                    Suggestions:
                    <ul className="list-disc list-inside mt-0.5">
                      {phrase.suggestions.map((suggestion, index) => (
                        <li key={index}>{suggestion}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
      {loadingPhrase && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-3">
              <div className="flex items-start gap-2">
                <Loader2 className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0 animate-spin" />
                <div className="flex-1">
                  <div className="font-medium">{loadingPhrase.text}</div>
                  <div className="text-sm text-muted-foreground mt-1">
                    → {loadingPhrase.userTranslation}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
}
