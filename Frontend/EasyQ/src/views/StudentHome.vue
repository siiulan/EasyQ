<template>
    <div class="StudentHome">
        <div class="container">
            <student-event />
        </div>
    </div>
</template>
<script>
import StudentEvent from '../components/StudentEvent.vue';

export default {
    name: 'studenthome',
    // mounted: function() {
    //   window.clearInterval()
    // },
    components: {
      StudentEvent
    },
};
</script>

