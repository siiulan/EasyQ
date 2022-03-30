<template>
  <div class="events container">
    <div class="columns is-multiline">
      <div v-for="event in events" :event="event" :key="event.id" class="column is-one-quarter">
        <router-link :to="`/event/${event.id}`">
          <StudentClassCard :event="event" />
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
import StudentClassCard from "@/components/StudentClassCard";
export default {
  name: "StudentEvent",
  components: {
    StudentClassCard
  },
  data() {
    return {
      event: {},
      events: [
        {
          id: 1,
          name: "Software Engineering",
          number: "ECE651",
          instructor: "instructor",
          term: "2022 Spring",
          description: "Foundation of software engineering",
          date: "02-01-2022",
          time: "11:30"
        },
        // {
        //   id: 2,
        //   name: "For instructors",
        //   category: "instructors",
        //   description:
        //     "Instructors could manage class and hold office hour here",
        //   location: "UW",
        //   date: "02-01-2022",
        //   time: "12:00"
        // }
      ]
    };
  }
};
</script>