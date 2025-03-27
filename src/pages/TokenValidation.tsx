
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ContentWrapper } from '@/components/layout/ContentWrapper';

const TokenValidation = () => {
  return (
    <ContentWrapper>
      <div className="max-w-4xl mx-auto py-12">
        <Card>
          <CardHeader>
            <CardTitle>API Token Validation</CardTitle>
          </CardHeader>
          <CardContent>
            <p>This page is used to validate and activate API tokens for AI agents.</p>
          </CardContent>
        </Card>
      </div>
    </ContentWrapper>
  );
};

export default TokenValidation;
