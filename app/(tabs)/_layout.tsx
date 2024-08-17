import { Tabs, useSegments } from "expo-router";
import React from "react";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const segment = useSegments();
  // get the current page from the segment
  const page = segment[segment.length - 1];
  // create an array of list pages you want to hide the tab bar in
  const pagesToShowTabBar = ["(home)", "explore"];
  console.log({ page });
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarStyle: {
          display: pagesToShowTabBar.includes(page) ? "flex" : "none",
        },
      }}
    >
      <Tabs.Screen
        name="(home)"
        options={{
          title: "Home",

          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "home" : "home-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "code-slash" : "code-slash-outline"}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
