import { Button } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";

const LangSwitcher = () => {
  const { locale, push, reload, pathname, query, asPath } = useRouter()
  const nextLocale = locale === 'en' ? 'ar' : 'en'

  const handleClick = async () => {
    await push({ pathname, query }, asPath, { locale: nextLocale });
    reload();
  };

  return (
    <Button
      mx={2}
      size={{ base: "sm", md: "md" }}
      colorScheme="cyan"
      onClick={handleClick}
    >
      {nextLocale.toString().toUpperCase()}
    </Button>
  );
};

export default LangSwitcher;
